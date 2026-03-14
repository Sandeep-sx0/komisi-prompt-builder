import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

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
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx, cy + s * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.6, cy);
  ctx.lineTo(cx, cy + s * 0.6);
  ctx.lineTo(cx + s * 0.6, cy);
  ctx.stroke();
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
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  const fs = size * 0.14;
  ctx.font = `bold ${fs}px sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", cx, cy + 1);
}

const iconDrawers = [drawLinkIcon, drawDownloadIcon, drawFingerprintIcon, drawDollarIcon];

function createIconTexture(index: number, color: string, alpha: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.globalAlpha = alpha;
  iconDrawers[index](ctx, size, color);
  ctx.globalAlpha = 1.0;
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

type LayerState = "inactive" | "active" | "visited";

/* ── Single Layer Box ── */
const LayerBox = ({ index, activeLayer }: { index: number; activeLayer: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const glowEdgesRef = useRef<THREE.LineSegments>(null);
  const iconMeshRef = useRef<THREE.Mesh>(null);

  const w = 3.5, d = 3.5, h = 0.6;
  const gap = 2.8;
  const baseY = (1.5 - index) * gap;

  const currentY = useRef(baseY);

  // Determine state
  let state: LayerState = "inactive";
  if (activeLayer === index) state = "active";
  else if (activeLayer > index) state = "visited";

  // Textures for each state
  const activeTexture = useMemo(() => createIconTexture(index, "#FFFFFF", 1.0), [index]);
  const visitedTexture = useMemo(() => createIconTexture(index, "#2A4A5E", 0.4), [index]);
  // Inactive = invisible icon, but we need a transparent texture
  const inactiveTexture = useMemo(() => createIconTexture(index, "#1E3A4A", 0.0), [index]);

  // Edge materials
  const edgeMatInactive = useMemo(() => new THREE.LineDashedMaterial({
    color: new THREE.Color("#1E3A4A"),
    transparent: true,
    opacity: 0.5,
    dashSize: 0.12,
    gapSize: 0.08,
  }), []);

  const edgeMatActive = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color("#FFFFFF"),
    transparent: true,
    opacity: 1.0,
  }), []);

  const edgeMatVisited = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color("#2A4A5E"),
    transparent: true,
    opacity: 0.7,
  }), []);

  // Glow edges (slightly larger box, only visible when active)
  const glowEdgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color("#FFFFFF"),
    transparent: true,
    opacity: 0.0,
  }), []);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(w, h, d), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  const glowBoxGeo = useMemo(() => new THREE.BoxGeometry(w + 0.08, h + 0.06, d + 0.08), []);
  const glowEdgesGeo = useMemo(() => new THREE.EdgesGeometry(glowBoxGeo), [glowBoxGeo]);

  // Icon plane on top face
  const iconGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 1.2), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = state === "active" ? baseY + 0.4 : baseY;
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, delta * 4);
    groupRef.current.position.y = currentY.current;

    // Edge material swap
    if (edgesRef.current) {
      if (state === "active") {
        edgesRef.current.material = edgeMatActive;
      } else if (state === "visited") {
        edgesRef.current.material = edgeMatVisited;
      } else {
        edgesRef.current.material = edgeMatInactive;
        edgesRef.current.computeLineDistances();
      }
    }

    // Glow edges
    if (glowEdgesRef.current) {
      const mat = glowEdgesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, state === "active" ? 0.15 : 0, delta * 4);
    }

    // Icon texture swap
    if (iconMeshRef.current) {
      const mat = iconMeshRef.current.material as THREE.MeshBasicMaterial;
      if (state === "active") {
        mat.map = activeTexture;
      } else if (state === "visited") {
        mat.map = visitedTexture;
      } else {
        mat.map = inactiveTexture;
      }
      mat.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, baseY, 0]}>
      {/* Wireframe edges — the only visible geometry */}
      <lineSegments ref={edgesRef} geometry={edgesGeo} material={edgeMatInactive} />

      {/* Glow wireframe behind (slightly larger, soft white bloom) */}
      <lineSegments ref={glowEdgesRef} geometry={glowEdgesGeo} material={glowEdgeMat} />

      {/* Icon on top face */}
      <mesh ref={iconMeshRef} position={[0, h / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={iconGeo}>
        <meshBasicMaterial map={inactiveTexture} transparent alphaTest={0.01} depthWrite={false} />
      </mesh>
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
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [start, end]);

  return (
    <line_ ref={ref} geometry={geo}>
      <lineDashedMaterial
        color={bright ? "#FFFFFF" : "#1E3A4A"}
        dashSize={0.1}
        gapSize={0.1}
        transparent
        opacity={bright ? 0.6 : 0.25}
      />
    </line_>
  );
};

/* ── Connector lines + corner dots between layers ── */
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
      {dots.map((dot, i) => {
        let state: LayerState = "inactive";
        if (activeLayer === dot.layerIdx) state = "active";
        else if (activeLayer > dot.layerIdx) state = "visited";

        const color = state === "active" ? "#FFFFFF" : state === "visited" ? "#2A4A5E" : "#1E3A4A";
        const opacity = state === "active" ? 1.0 : state === "visited" ? 0.5 : 0.3;

        return (
          <mesh key={`dot-${i}`} position={dot.pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ── Scene ── */
const Scene = ({ activeLayer }: { activeLayer: number }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[-5, 8, 5]} intensity={0.5} color="#ffffff" />

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
