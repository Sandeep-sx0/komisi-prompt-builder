import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";

interface Integration {
  name: string;
  logo: string;
}

export const IntegrationGrid = ({ integrations }: { integrations: Integration[] }) => {
  const [shimmeringTiles, setShimmeringTiles] = useState<Set<number>>(new Set());
  const cooldownRef = useRef<Set<number>>(new Set());

  const triggerShimmer = useCallback(() => {
    const available = integrations
      .map((_, i) => i)
      .filter(i => !shimmeringTiles.has(i) && !cooldownRef.current.has(i));

    if (available.length === 0) return;

    const count = Math.random() > 0.5 ? 2 : 1;
    const picked: number[] = [];
    for (let c = 0; c < Math.min(count, available.length); c++) {
      const idx = Math.floor(Math.random() * available.length);
      const tile = available.splice(idx, 1)[0];
      picked.push(tile);
    }

    setShimmeringTiles(prev => {
      const next = new Set(prev);
      picked.forEach(p => next.add(p));
      return next;
    });

    picked.forEach(p => cooldownRef.current.add(p));

    setTimeout(() => {
      setShimmeringTiles(prev => {
        const next = new Set(prev);
        picked.forEach(p => next.delete(p));
        return next;
      });
    }, 700);

    setTimeout(() => {
      picked.forEach(p => cooldownRef.current.delete(p));
    }, 2400);
  }, [integrations, shimmeringTiles]);

  useEffect(() => {
    const id = setInterval(triggerShimmer, 800);
    return () => clearInterval(id);
  }, [triggerShimmer]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-12">
      {integrations.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          whileHover={{ scale: 1.06, boxShadow: "0 8px 24px rgba(8,145,178,0.15)" }}
          className="border bg-card rounded-xl p-5 text-center cursor-default relative overflow-hidden"
          style={{
            borderColor: shimmeringTiles.has(i) ? '#0891B2' : undefined,
            boxShadow: shimmeringTiles.has(i)
              ? '0 0 0 1px #0891B2, 0 0 12px rgba(8,145,178,0.3)'
              : undefined,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {shimmeringTiles.has(i) && (
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
                animation: 'tile-shimmer 0.6s ease-in-out forwards',
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
  );
};
