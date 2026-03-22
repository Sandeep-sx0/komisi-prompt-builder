import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Integration {
  name: string;
  logo: string;
}

// Define which integrations are "related" by index pairs
const CONNECTIONS: [number, number][] = [
  [0, 2],   // RevenueCat ↔ Stripe
  [0, 3],   // RevenueCat ↔ Apple App Store
  [1, 4],   // Adapty ↔ Google Play
  [2, 5],   // Stripe ↔ Amplitude
  [3, 4],   // Apple ↔ Google Play
  [5, 6],   // Amplitude ↔ Mixpanel
  [7, 8],   // AppsFlyer ↔ Adjust
  [9, 11],  // Firebase ↔ Slack
  [10, 14], // Braze ↔ PostHog
  [12, 7],  // TikTok ↔ AppsFlyer
  [13, 9],  // OneSignal ↔ Firebase
  [0, 1],   // RevenueCat ↔ Adapty
  [6, 14],  // Mixpanel ↔ PostHog
];

export const IntegrationGrid = ({ integrations }: { integrations: Integration[] }) => {
  const [activeConnection, setActiveConnection] = useState<[number, number] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cooldownRef = useRef<Set<number>>(new Set());

  const activeTiles = useMemo(() => {
    if (!activeConnection) return new Set<number>();
    return new Set(activeConnection);
  }, [activeConnection]);

  const triggerConnection = useCallback(() => {
    const available = CONNECTIONS.filter(
      ([a, b]) => !cooldownRef.current.has(a) && !cooldownRef.current.has(b)
    );
    if (available.length === 0) return;

    const pair = available[Math.floor(Math.random() * available.length)];
    setActiveConnection(pair);

    cooldownRef.current.add(pair[0]);
    cooldownRef.current.add(pair[1]);

    setTimeout(() => {
      setActiveConnection(null);
    }, 1800);

    setTimeout(() => {
      cooldownRef.current.delete(pair[0]);
      cooldownRef.current.delete(pair[1]);
    }, 4000);
  }, []);

  useEffect(() => {
    const id = setInterval(triggerConnection, 2500);
    return () => clearInterval(id);
  }, [triggerConnection]);

  // Calculate line coordinates between two tiles
  const getLineCoords = useCallback(() => {
    if (!activeConnection || !gridRef.current) return null;
    const [a, b] = activeConnection;
    const tileA = tileRefs.current[a];
    const tileB = tileRefs.current[b];
    if (!tileA || !tileB) return null;

    const gridRect = gridRef.current.getBoundingClientRect();
    const rectA = tileA.getBoundingClientRect();
    const rectB = tileB.getBoundingClientRect();

    return {
      x1: rectA.left + rectA.width / 2 - gridRect.left,
      y1: rectA.top + rectA.height / 2 - gridRect.top,
      x2: rectB.left + rectB.width / 2 - gridRect.left,
      y2: rectB.top + rectB.height / 2 - gridRect.top,
    };
  }, [activeConnection]);

  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  useEffect(() => {
    if (activeConnection) {
      // Small delay to let DOM settle
      requestAnimationFrame(() => {
        setLineCoords(getLineCoords());
      });
    } else {
      setLineCoords(null);
    }
  }, [activeConnection, getLineCoords]);

  return (
    <div className="relative mt-12" ref={gridRef}>
      {/* SVG connection line overlay */}
      <AnimatePresence>
        {lineCoords && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#A78BFA" stopOpacity="1" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
              </linearGradient>
              <filter id="line-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Glow line */}
            <motion.line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke="url(#line-gradient)"
              strokeWidth="2"
              filter="url(#line-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Traveling dot */}
            <motion.circle
              r="3"
              fill="#A78BFA"
              filter="url(#line-glow)"
              initial={{ cx: lineCoords.x1, cy: lineCoords.y1, opacity: 0 }}
              animate={{
                cx: [lineCoords.x1, lineCoords.x2],
                cy: [lineCoords.y1, lineCoords.y2],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {integrations.map((item, i) => (
          <motion.div
            key={item.name}
            ref={(el) => { tileRefs.current[i] = el; }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 24px rgba(124,58,237,0.15)" }}
            className="border bg-card rounded-xl p-5 text-center cursor-default relative overflow-hidden"
            style={{
              borderColor: activeTiles.has(i) ? '#7C3AED' : undefined,
              boxShadow: activeTiles.has(i)
                ? '0 0 0 1px #7C3AED, 0 0 16px rgba(124,58,237,0.25)'
                : undefined,
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              zIndex: activeTiles.has(i) ? 6 : 1,
            }}
          >
            {activeTiles.has(i) && (
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
                }}
              />
            )}
            <img
              src={item.logo}
              alt={item.name}
              className="w-12 h-12 mx-auto mb-3 object-contain rounded-xl"
            />
            <span className="text-sm font-medium text-text-secondary">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
