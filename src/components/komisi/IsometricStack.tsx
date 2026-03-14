import React from "react";
import { motion } from "motion/react";
import { Link2, Download, Fingerprint, CircleDollarSign } from "lucide-react";

const layers = [
  {
    label: "Creator Link",
    icon: Link2,
    opacity: 1,
    fill: "rgba(255,255,255,0.06)",
    stroke: "rgba(255,255,255,0.3)",
    glow: true,
  },
  {
    label: "App Store & Install",
    icon: Download,
    opacity: 0.7,
    fill: "rgba(255,255,255,0.03)",
    stroke: "rgba(255,255,255,0.18)",
    glow: false,
  },
  {
    label: "SDK First Launch",
    icon: Fingerprint,
    sub: "iOS: Fingerprint Match · Android: Play Referrer",
    opacity: 0.5,
    fill: "rgba(255,255,255,0.015)",
    stroke: "rgba(255,255,255,0.12)",
    glow: false,
  },
  {
    label: "Commission Queued",
    icon: CircleDollarSign,
    opacity: 0.35,
    fill: "rgba(255,255,255,0.008)",
    stroke: "rgba(255,255,255,0.08)",
    glow: false,
  },
];

/* Isometric platform path for a flat rhombus-like shape */
const IsoPlatform = ({
  y,
  layer,
  index,
}: {
  y: number;
  layer: (typeof layers)[0];
  index: number;
}) => {
  const Icon = layer.icon;
  const w = 200 - index * 6;
  const h = 50;

  return (
    <motion.g
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <g transform={`translate(250, ${y})`}>
        {/* Glow effect for top layer */}
        {layer.glow && (
          <ellipse
            cx={0}
            cy={4}
            rx={w * 0.55}
            ry={22}
            fill="url(#topGlow)"
          />
        )}

        {/* Top face - isometric rhombus */}
        <path
          d={`M 0 ${-h * 0.3} L ${w * 0.5} 0 L 0 ${h * 0.3} L ${-w * 0.5} 0 Z`}
          fill={layer.fill}
          stroke={layer.stroke}
          strokeWidth={layer.glow ? 1.5 : 1}
          style={
            layer.glow
              ? {
                  filter: "drop-shadow(0 0 12px rgba(160,180,255,0.3))",
                }
              : undefined
          }
        />

        {/* Right face */}
        <path
          d={`M ${w * 0.5} 0 L ${w * 0.5} 10 L 0 ${h * 0.3 + 10} L 0 ${h * 0.3} Z`}
          fill="rgba(255,255,255,0.02)"
          stroke={layer.stroke}
          strokeWidth={0.5}
        />

        {/* Left face */}
        <path
          d={`M ${-w * 0.5} 0 L ${-w * 0.5} 10 L 0 ${h * 0.3 + 10} L 0 ${h * 0.3} Z`}
          fill="rgba(255,255,255,0.01)"
          stroke={layer.stroke}
          strokeWidth={0.5}
        />

        {/* Icon */}
        <foreignObject
          x={-10}
          y={-12}
          width={20}
          height={20}
          style={{ opacity: layer.opacity }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Icon size={14} color="white" strokeWidth={1.5} />
          </div>
        </foreignObject>

        {/* Label */}
        <text
          x={0}
          y={-h * 0.3 - 8}
          textAnchor="middle"
          fill={`rgba(255,255,255,${layer.opacity})`}
          fontSize={9}
          fontFamily="inherit"
          letterSpacing="0.05em"
        >
          {layer.label}
        </text>

        {/* Sub text for SDK layer */}
        {layer.sub && (
          <text
            x={0}
            y={12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize={6.5}
            fontFamily="inherit"
          >
            {layer.sub}
          </text>
        )}
      </g>
    </motion.g>
  );
};

export const IsometricStack: React.FC = () => {
  const layerSpacing = 90;
  const startY = 60;

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 440"
        className="w-full max-w-[420px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="topGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(140,160,255,0.25)" />
            <stop offset="100%" stopColor="rgba(140,160,255,0)" />
          </radialGradient>
        </defs>

        {/* Dashed vertical connectors between layers */}
        {[0, 1, 2].map((i) => {
          const y1 = startY + i * layerSpacing + 30;
          const y2 = startY + (i + 1) * layerSpacing - 20;
          return (
            <motion.line
              key={i}
              x1={250}
              y1={y1}
              x2={250}
              y2={y2}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              strokeDasharray="3 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            />
          );
        })}

        {/* Layers */}
        {layers.map((layer, i) => (
          <IsoPlatform
            key={i}
            y={startY + i * layerSpacing}
            layer={layer}
            index={i}
          />
        ))}
      </svg>
    </div>
  );
};
