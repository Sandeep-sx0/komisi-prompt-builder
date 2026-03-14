import React, { useRef, useState, useEffect } from "react";
import { Link2, Download, Fingerprint, CircleDollarSign } from "lucide-react";

const LAYERS = [
  { label: "Creator Link", icon: Link2 },
  { label: "App Store & Install", icon: Download },
  { label: "SDK First Launch", icon: Fingerprint, sub: "iOS: Fingerprint · Android: Play Referrer" },
  { label: "Commission Queued", icon: CircleDollarSign },
];

/* ── Single isometric platform ── */
const IsoPlatform = ({
  y,
  index,
  active,
}: {
  y: number;
  index: number;
  active: boolean;
}) => {
  const layer = LAYERS[index];
  const Icon = layer.icon;
  const w = 260 - index * 8;
  const depth = 22;
  const halfH = 36;

  const lift = active ? -8 : 0;
  const edgeOpacity = active ? 0.6 : 0.08 + (3 - index) * 0.02;
  const fillOpacity = active ? 0.1 : 0.015;
  const iconOpacity = active ? 1 : 0.15;
  const labelOpacity = active ? 0.9 : 0.2;

  // Prismatic glow color cycling via CSS animation
  const glowFilter = active
    ? "drop-shadow(0 0 18px rgba(120,140,255,0.5)) drop-shadow(0 0 40px rgba(160,120,255,0.25))"
    : "none";

  return (
    <g
      transform={`translate(300, ${y})`}
      style={{
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        transform: `translate(300px, ${y + lift}px)`,
      }}
    >
      {/* Glow ellipse behind active layer */}
      <ellipse
        cx={0}
        cy={6}
        rx={w * 0.5}
        ry={28}
        fill={active ? "rgba(130,150,255,0.15)" : "transparent"}
        style={{ transition: "fill 0.6s ease" }}
      />

      {/* Top face */}
      <path
        d={`M 0 ${-halfH} L ${w * 0.5} 0 L 0 ${halfH} L ${-w * 0.5} 0 Z`}
        fill={`rgba(255,255,255,${fillOpacity})`}
        stroke={`rgba(255,255,255,${edgeOpacity})`}
        strokeWidth={active ? 1.5 : 0.8}
        style={{
          filter: glowFilter,
          transition: "all 0.6s ease",
        }}
      />

      {/* Right face (depth) */}
      <path
        d={`M ${w * 0.5} 0 L ${w * 0.5} ${depth} L 0 ${halfH + depth} L 0 ${halfH} Z`}
        fill={`rgba(255,255,255,${fillOpacity * 0.4})`}
        stroke={`rgba(255,255,255,${edgeOpacity * 0.5})`}
        strokeWidth={0.5}
        style={{ transition: "all 0.6s ease" }}
      />

      {/* Left face (depth) */}
      <path
        d={`M ${-w * 0.5} 0 L ${-w * 0.5} ${depth} L 0 ${halfH + depth} L 0 ${halfH} Z`}
        fill={`rgba(255,255,255,${fillOpacity * 0.2})`}
        stroke={`rgba(255,255,255,${edgeOpacity * 0.5})`}
        strokeWidth={0.5}
        style={{ transition: "all 0.6s ease" }}
      />

      {/* Icon */}
      <foreignObject x={-12} y={-12} width={24} height={24}>
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ opacity: iconOpacity, transition: "opacity 0.6s ease" }}
        >
          <Icon size={16} color="white" strokeWidth={1.5} />
        </div>
      </foreignObject>

      {/* Label above */}
      <text
        x={0}
        y={-halfH - 10}
        textAnchor="middle"
        fill={`rgba(255,255,255,${labelOpacity})`}
        fontSize={10}
        fontFamily="inherit"
        letterSpacing="0.06em"
        style={{ transition: "fill 0.6s ease" }}
      >
        {layer.label}
      </text>

      {/* Subtext */}
      {layer.sub && (
        <text
          x={0}
          y={14}
          textAnchor="middle"
          fill={`rgba(255,255,255,${active ? 0.4 : 0.1})`}
          fontSize={7}
          fontFamily="inherit"
          style={{ transition: "fill 0.6s ease" }}
        >
          {layer.sub}
        </text>
      )}
    </g>
  );
};

export const IsometricStack = ({ activeLayer }: { activeLayer: number }) => {
  const layerSpacing = 110;
  const startY = 70;

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox="0 0 600 540"
        className="w-full max-w-[520px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed vertical connectors */}
        {[0, 1, 2].map((i) => {
          const y1 = startY + i * layerSpacing + 60;
          const y2 = startY + (i + 1) * layerSpacing - 40;
          return (
            <line
              key={i}
              x1={300}
              y1={y1}
              x2={300}
              y2={y2}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
          );
        })}

        {/* Layers — render bottom-up so top is visually on top */}
        {[3, 2, 1, 0].map((i) => (
          <IsoPlatform
            key={i}
            y={startY + i * layerSpacing}
            index={i}
            active={activeLayer === i}
          />
        ))}
      </svg>
    </div>
  );
};
