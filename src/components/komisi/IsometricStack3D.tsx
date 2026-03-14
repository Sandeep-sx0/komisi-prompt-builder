import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

// Extend R3F to recognize <line_> as THREE.Line
extend({ Line_: THREE.Line });

declare module "@react-three/fiber" {
  interface ThreeElements {
    line_: any;
  }
}

/* ── Icon drawing helpers ── */
function drawLinkIcon(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const cx = size / 2, cy = size / 2, r = size * 0.18;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.04;
  ctx.lineCap = "round";
  // Two interlocking ovals
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.5, cy, r, r * 0.6, -Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.5, cy, r, r * 0.6, -Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
}

function drawDownloadIcon(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const cx = size / 2, cy = size / 2, s = size * 0.15;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.04;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // Arrow down
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx, cy + s * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.6, cy);
  ctx.lineTo(cx, cy + s * 0.6);
  ctx.lineTo(cx + s * 0.6, cy);
  ctx.stroke();
  // Base line
  ctx.beginPath();
  ctx.moveTo(cx - s, cy + s);
  ctx.lineTo(cx + s, cy + s);
  ctx.stroke();
}

function drawFingerprintIcon(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const cx = size / 2, cy = size / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.03;
  ctx.lineCap = "round";
  const radii = [size * 0.06, size * 0.1, size * 0.14, size * 0.18];
  radii.forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.02, r, -Math.PI * 0.8 + i * 0.1, -Math.PI * 0.2 - i * 0.1);
    ctx.stroke();
  });
}

function drawDollarIcon(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const cx = size / 2, cy = size / 2, r = size * 0.18;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.035;
  ctx.lineCap = "round";
  // Circle
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  // Dollar sign
  const fs = size * 0.14;
  ctx.font = `bold ${fs}px sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", cx, cy + 1);
}

const iconDrawers = [drawLinkIcon, drawDownloadIcon, drawFingerprintIcon, drawDollarIcon];

function createIconTexture(index: number, active: boolean): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  const color = active ? "#FFFFFF" : "#1E3A4A";
  iconDrawers[index](ctx, size, color);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ── Single Layer Box ── */
const LayerBox = ({ index, activeLayer }: { index: number; activeLayer: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const iconMeshRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const w = 3.5, d = 3.5, h = 0.6;
  const gap = 2.8;
  const baseY = (1.5 - index) * gap;

  const isActive = activeLayer === index;
  const targetY = useRef(baseY);
  const currentY = useRef(baseY);

  // Textures
  const inactiveTexture = useMemo(() => createIconTexture(index, false), [index]);
  const activeTexture = useMemo(() => createIconTexture(index, true), [index]);

  // Materials
  const inactiveMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0C1C28"),
    metalness: 0.8,
    roughness: 0.4,
    transparent: true,
    opacity: 0.85,
  }), []);

  const activeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0C1C28"),
    metalness: 1.0,
    roughness: 0.1,
    envMapIntensity: 2.0,
  }), []);

  const edgeMatInactive = useMemo(() => new THREE.LineDashedMaterial({
    color: new THREE.Color("#1E3A4A"),
    transparent: true,
    opacity: 0.8,
    dashSize: 0.08,
    gapSize: 0.06,
  }), []);

  const edgeMatActive = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color("#FFFFFF"),
    transparent: true,
    opacity: 1.0,
  }), []);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(w, h, d), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  // Glow box (slightly larger, transparent)
  const glowGeo = useMemo(() => new THREE.BoxGeometry(w + 0.15, h + 0.1, d + 0.15), []);

  // Icon plane on top face
  const iconGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 1.2), []);

  // Corner screws
  const screwGeo = useMemo(() => new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), []);
  const screwMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1E3A4A", metalness: 0.9, roughness: 0.3 }), []);
  const screwPositions = useMemo(() => [
    [w / 2 - 0.15, h / 2 + 0.04, d / 2 - 0.15],
    [-w / 2 + 0.15, h / 2 + 0.04, d / 2 - 0.15],
    [w / 2 - 0.15, h / 2 + 0.04, -d / 2 + 0.15],
    [-w / 2 + 0.15, h / 2 + 0.04, -d / 2 + 0.15],
  ] as [number, number, number][], []);

  // Vent slots on front face
  const ventGeo = useMemo(() => new THREE.BoxGeometry(0.3, 0.12, 0.05), []);
  const ventMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111122", metalness: 0.5, roughness: 0.8 }), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    targetY.current = isActive ? baseY + 0.3 : baseY;
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY.current, delta * 4);
    groupRef.current.position.y = currentY.current;

    // Material swap
    if (meshRef.current) {
      meshRef.current.material = isActive ? activeMat : inactiveMat;
    }

    // Icon texture swap
    if (iconMeshRef.current) {
      (iconMeshRef.current.material as THREE.MeshBasicMaterial).map = isActive ? activeTexture : inactiveTexture;
      (iconMeshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }

    // Glow
    if (glowRef.current) {
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      const t = state.clock.elapsedTime;
      if (isActive) {
        glowMat.color.set("#FFFFFF");
        glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, 0.12, delta * 4);
      } else {
        glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, 0, delta * 4);
      }
    }

    // Edge brightness
    if (edgesRef.current) {
      if (isActive) {
        edgesRef.current.material = edgeMatActive;
      } else {
        edgesRef.current.material = edgeMatInactive;
        // Ensure dashed lines compute distances
        edgesRef.current.computeLineDistances();
      }
    }

    // Point light
    if (pointLightRef.current) {
      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        isActive ? 2.0 : 0,
        delta * 4
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, baseY, 0]}>
      {/* Main box */}
      <mesh ref={meshRef} geometry={boxGeo} material={inactiveMat} />

      {/* Edges wireframe */}
      <lineSegments ref={edgesRef} geometry={edgesGeo} material={edgeMatInactive} />

      {/* Glow box */}
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial transparent opacity={0} color="#FFFFFF" side={THREE.BackSide} />
      </mesh>

      {/* Icon on top */}
      <mesh ref={iconMeshRef} position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={iconGeo}>
        <meshBasicMaterial map={inactiveTexture} transparent alphaTest={0.1} />
      </mesh>

      {/* Corner screws */}
      {screwPositions.map((pos, i) => (
        <mesh key={`screw-${i}`} geometry={screwGeo} material={screwMat} position={pos} />
      ))}

      {/* Vent slots on front face */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`vent-${i}`}
          geometry={ventGeo}
          material={ventMat}
          position={[-1.25 + i * 0.5, 0, d / 2 + 0.001]}
        />
      ))}

      {/* Point light for active glow */}
      <pointLight ref={pointLightRef} position={[0, 1.5, 0]} color="#FFFFFF" intensity={0} distance={5} />
    </group>
  );
};

/* ── Connector line segment ── */
const ConnectorLine = ({ start, end, bright }: { start: THREE.Vector3; end: THREE.Vector3; bright: boolean }) => {
  const ref = useRef<THREE.Line>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.computeLineDistances();
    }
  }, [start, end]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([start, end]);
    return g;
  }, [start, end]);

  return (
    <line_ ref={ref} geometry={geo}>
      <lineDashedMaterial
        color={bright ? "#FFFFFF" : "#1E3A4A"}
        dashSize={0.1}
        gapSize={0.1}
        transparent
        opacity={bright ? 0.8 : 0.4}
      />
    </line_>
  );
};

/* ── Dashed connector lines between layers ── */
const DashedConnectors = ({ activeLayer }: { activeLayer: number }) => {
  const w = 3.5, d = 3.5, h = 0.6;
  const gap = 2.8;

  const corners: [number, number][] = [
    [w / 2 - 0.15, d / 2 - 0.15],
    [-w / 2 + 0.15, d / 2 - 0.15],
    [w / 2 - 0.15, -d / 2 + 0.15],
    [-w / 2 + 0.15, -d / 2 + 0.15],
  ];

  const segments: { start: THREE.Vector3; end: THREE.Vector3; pairIndex: number }[] = [];
  for (let layer = 0; layer < 3; layer++) {
    const topY = (1.5 - layer) * gap - h / 2;
    const bottomY = (1.5 - (layer + 1)) * gap + h / 2;
    corners.forEach(([cx, cz]) => {
      segments.push({
        start: new THREE.Vector3(cx, topY, cz),
        end: new THREE.Vector3(cx, bottomY, cz),
        pairIndex: layer + 1,
      });
    });
  }

  const dots: { pos: [number, number, number]; layerIdx: number }[] = [];
  for (let layer = 0; layer < 4; layer++) {
    const baseY = (1.5 - layer) * gap;
    corners.forEach(([cx, cz]) => {
      dots.push({ pos: [cx, baseY + h / 2, cz], layerIdx: layer });
      dots.push({ pos: [cx, baseY - h / 2, cz], layerIdx: layer });
    });
  }

  return (
    <group>
      {segments.map((seg, i) => (
        <ConnectorLine key={i} start={seg.start} end={seg.end} bright={activeLayer === seg.pairIndex} />
      ))}
      {dots.map((dot, i) => (
        <mesh key={`dot-${i}`} position={dot.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={activeLayer === dot.layerIdx ? "#FFFFFF" : "#1E3A4A"} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Scene ── */
const Scene = ({ activeLayer }: { activeLayer: number }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Classic isometric: rotate 45° on Y, ~35.264° on X
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight position={[-5, 8, 5]} intensity={0.6} color="#ffffff" />

      {[0, 1, 2, 3].map((i) => (
        <LayerBox key={i} index={i} activeLayer={activeLayer} />
      ))}

      <DashedConnectors activeLayer={activeLayer} />
    </>
  );
};

/* ── Exported component ── */
export const IsometricStack3D = ({ activeLayer }: { activeLayer: number }) => {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px]">
      <Canvas
        orthographic
        camera={{
        zoom: 54,
        position: [10, 8, 10],
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene activeLayer={activeLayer} />
      </Canvas>
    </div>
  );
};
