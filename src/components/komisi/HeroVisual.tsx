import React, { useEffect, useState, useRef } from 'react';
import { CountingNumber } from '@/components/animate-ui/primitives/texts/counting-number';
import HeroDashboard from './HeroDashboard';

const HeroVisual: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Notification pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => setShowNotification(true), 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full" style={{ minHeight: 480 }}>
      {/* Dashboard — bleeding off right edge */}
      <div
        className="absolute top-0 rounded-2xl overflow-hidden"
        style={{
          left: '10%',
          right: '-80px',
          height: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
        }}
      >
        <HeroDashboard />
      </div>

      {/* Floating notification pill */}
      <div
        className="absolute z-20 rounded-full px-4 py-2"
        style={{
          left: '5%',
          top: '12%',
          backgroundColor: '#0C1C28',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          opacity: showNotification ? 1 : 0,
          transition: 'opacity 600ms ease-in-out',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ADE80' }} />
          <span className="text-white text-[11px]">📱 New install attributed · Just now</span>
        </div>
      </div>

      {/* Creator card — foreground, overlapping dashboard */}
      <div
        className="absolute z-10 rounded-2xl"
        style={{
          left: '0',
          bottom: '8%',
          width: 260,
          backgroundColor: '#FFFFFF',
          padding: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/avatars/user-1.jpg"
            alt="Sarah"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: '#111827' }}>@sarahcreates</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>12.4K followers</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ADE80' }} />
            <span className="text-xs" style={{ color: '#4ADE80' }}>Active</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-3" style={{ height: 1, backgroundColor: '#F3F4F6' }} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          {[
            { value: 234, label: 'Installs', prefix: '', suffix: '', decimals: 0 },
            { value: 630, label: 'Earned', prefix: '$', suffix: '', decimals: 0 },
            { value: 5.2, label: 'Conv Rate', prefix: '', suffix: '%', decimals: 1 },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-base font-bold" style={{ color: '#111827' }}>
                {inView ? (
                  <CountingNumber
                    number={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimalPlaces={s.decimals}
                    transition={{ stiffness: 50, damping: 30 }}
                  />
                ) : (
                  <span>{s.prefix}0{s.suffix}</span>
                )}
              </p>
              <p className="text-[10px]" style={{ color: '#6B7280' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full rounded-full" style={{ height: 6, backgroundColor: '#F3F4F6' }}>
            <div
              className="rounded-full"
              style={{
                height: 6,
                backgroundColor: '#4ADE80',
                width: inView ? '68%' : '0%',
                transition: 'width 1.5s ease-in-out 0.5s',
              }}
            />
          </div>
          <p className="text-[10px] mt-1" style={{ color: '#6B7280' }}>68% of goal</p>
        </div>

        {/* Payout line */}
        <p className="text-xs" style={{ color: '#6B7280' }}>Next payout: $630 · Mar 15</p>
      </div>
    </div>
  );
};

export default HeroVisual;
