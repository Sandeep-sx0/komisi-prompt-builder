import React, { useEffect, useState, useRef, useCallback } from 'react';
import { CountingNumber } from '@/components/animate-ui/primitives/texts/counting-number';

const CYCLE = 28000;

const metrics = [
  { key: 'affiliates', label: 'Affiliates', value: 12, prefix: '', suffix: '', decimals: 0, trend: '▲ 3 new' },
  { key: 'installs', label: 'Installs', value: 847, prefix: '', suffix: '', decimals: 0, trend: '▲ 12%' },
  { key: 'revenue', label: 'Revenue', value: 2340, prefix: '$', suffix: '', decimals: 0, trend: '▲ 23%' },
  { key: 'campaigns', label: 'Campaigns', value: 8, prefix: '', suffix: '', decimals: 0, trend: '' },
  { key: 'convRate', label: 'Conv Rate', value: 4.2, prefix: '', suffix: '%', decimals: 1, trend: '▲ 0.8%' },
];

const activityRows = [
  { icon: '🟢', title: 'New install attributed', detail: '@sarahcreates · TikTok Q1 Campaign · $3.00 queued', time: 'Just now' },
  { icon: '💰', title: 'Payout sent: $234.00 to @sarahcreates', detail: 'via Stripe Connect · 2h ago', time: '' },
  { icon: '👤', title: 'New affiliate joined: @mobilereview', detail: 'Applied via marketplace · 5h ago', time: '' },
  { icon: '📱', title: 'Install attributed: @techreviewer', detail: 'YouTube Review · $5.00 commission · 8h ago', time: '' },
];

const leaderboard = [
  { rank: 1, handle: '@sarahcreates', installs: 234, revenue: '$890', conv: '5.2%', highlight: true },
  { rank: 2, handle: '@techreviewer', installs: 189, revenue: '$672', conv: '4.8%', highlight: false },
  { rank: 3, handle: '@appjunkie', installs: 156, revenue: '$445', conv: '3.9%', highlight: false },
  { rank: 4, handle: '@fitnesstech', installs: 98, revenue: '$333', conv: '6.1%', highlight: false },
];

const revenuePoints = '0,70 30,58 60,62 90,45 120,48 150,35 180,30 210,22 240,18 270,10';
const installPoints = '0,75 30,68 60,70 90,55 120,58 150,50 180,42 210,38 240,28 270,20';

const HeroDashboard: React.FC = () => {
  const [scene, setScene] = useState(1);
  const [metricsActive, setMetricsActive] = useState(false);
  const [chartDrawn, setChartDrawn] = useState(false);
  const [visibleActivity, setVisibleActivity] = useState(0);
  const [installBump, setInstallBump] = useState(false);
  const [visibleLeader, setVisibleLeader] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScanning, setShowScanning] = useState(false);
  const [showFraudAlert, setShowFraudAlert] = useState(false);
  const [alertPulse, setAlertPulse] = useState(false);
  const [amberOverlay, setAmberOverlay] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const t = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const reset = useCallback(() => {
    setScene(1);
    setMetricsActive(false);
    setChartDrawn(false);
    setVisibleActivity(0);
    setInstallBump(false);
    setVisibleLeader(0);
    setShowTooltip(false);
    setShowScanning(false);
    setShowFraudAlert(false);
    setAlertPulse(false);
    setAmberOverlay(false);
  }, []);

  useEffect(() => {
    const run = () => {
      clearAll();
      reset();
      t(() => setMetricsActive(true), 200);
      t(() => setChartDrawn(true), 400);
      t(() => { setScene(2); setVisibleActivity(0); }, 8000);
      t(() => { setInstallBump(true); setVisibleActivity(1); }, 8500);
      t(() => setVisibleActivity(2), 9200);
      t(() => setVisibleActivity(3), 9900);
      t(() => setVisibleActivity(4), 10600);
      t(() => setInstallBump(false), 11000);
      t(() => { setScene(3); setVisibleLeader(0); }, 14000);
      t(() => setVisibleLeader(1), 14500);
      t(() => setVisibleLeader(2), 15000);
      t(() => setVisibleLeader(3), 15500);
      t(() => setVisibleLeader(4), 16000);
      t(() => setShowTooltip(true), 17000);
      t(() => setShowTooltip(false), 19000);
      t(() => { setScene(4); setShowScanning(true); }, 20000);
      t(() => {
        setShowScanning(false);
        setShowFraudAlert(true);
        setAlertPulse(true);
        setAmberOverlay(true);
      }, 21500);
      t(() => setAlertPulse(false), 22500);
      t(() => setAmberOverlay(false), 23500);
      t(() => setScene(0), 25000);
    };

    run();
    const interval = setInterval(() => { run(); }, CYCLE);
    return () => { clearAll(); clearInterval(interval); };
  }, [t, clearAll, reset]);

  const fade = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transition: 'opacity 600ms ease-in-out',
  });

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative"
      style={{ backgroundColor: '#1E0A3C', minHeight: 380 }}
    >
      {/* Amber overlay for fraud scene */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl z-10"
        style={{
          background: 'rgba(245,158,11,0.04)',
          ...fade(amberOverlay),
        }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid #2D1B69' }}>
        <span className="text-[10px] text-white/80 tracking-[0.1em] font-semibold uppercase">Komisi Dashboard</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/40 px-2 py-0.5 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>MindfulApp ▾</span>
          <span className="flex items-center gap-1 text-[10px] text-white">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ADE80' }} />
            Live
          </span>
        </div>
      </div>

      {/* 5 metric cards */}
      <div className="grid grid-cols-5 gap-1.5 px-3 py-2.5">
        {metrics.map((m) => (
          <div
            key={m.key}
            className="rounded-lg px-2 py-2 text-center relative overflow-hidden"
            style={{
              backgroundColor: installBump && m.key === 'installs' ? 'rgba(74,222,128,0.1)' : '#1A0B2E',
              transition: 'background-color 500ms ease',
            }}
          >
            <div className="text-white text-sm font-bold leading-none mb-0.5">
              {metricsActive ? (
                <CountingNumber
                  number={installBump && m.key === 'installs' ? 848 : installBump && m.key === 'revenue' ? 2343 : m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimalPlaces={m.decimals}
                  transition={{ stiffness: 40, damping: 30 }}
                />
              ) : (
                <span>{m.prefix}0{m.suffix}</span>
              )}
            </div>
            <div className="text-[9px] leading-none mb-0.5" style={{ color: '#6B7280' }}>{m.label}</div>
            {m.trend && <div className="text-[8px] leading-none" style={{ color: '#4ADE80' }}>{m.trend}</div>}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-3" style={{ height: 1, backgroundColor: '#2D1B69' }} />

      {/* Scene area */}
      <div className="relative px-3 py-2.5" style={{ minHeight: 220 }}>

        {/* Scene 1 — Revenue Chart */}
        <div style={fade(scene === 1)}>
          {scene === 1 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[10px] text-white/80 font-medium">Revenue from Affiliates</span>
                  <span className="text-[9px] block" style={{ color: '#6B7280' }}>Feb 25 – Mar 04</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[9px]" style={{ color: '#3B82F6' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3B82F6' }} /> Installs
                  </span>
                  <span className="flex items-center gap-1 text-[9px]" style={{ color: '#4ADE80' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4ADE80' }} /> Revenue
                  </span>
                </div>
              </div>
              <div className="relative" style={{ height: 140 }}>
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px]" style={{ color: '#4B5563' }}>
                  {['$2,500', '$2,000', '$1,500', '$1,000'].map(l => <span key={l}>{l}</span>)}
                </div>
                <svg viewBox="0 0 280 90" className="w-full h-full ml-8" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon fill="url(#heroRevGrad)" points={`${revenuePoints} 270,90 0,90`} />
                  <polyline
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="2"
                    points={revenuePoints}
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: chartDrawn ? 0 : 400,
                      transition: 'stroke-dashoffset 2s ease-in-out',
                    }}
                  />
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    points={installPoints}
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: chartDrawn ? 0 : 400,
                      transition: 'stroke-dashoffset 2s ease-in-out 0.3s',
                    }}
                  />
                </svg>
                <div className="flex justify-between ml-8 mt-1 text-[8px]" style={{ color: '#4B5563' }}>
                  {['2/25', '26', '27', '28', '3/1', '2', '3', '3/4'].map(l => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scene 2 — Activity Feed */}
        <div className="absolute inset-0 px-3 py-2.5" style={fade(scene === 2)}>
          {scene === 2 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/80 font-medium">Recent Activity</span>
                <span className="flex items-center gap-1 text-[9px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#4ADE80' }} /> Live
                </span>
              </div>
              <div className="space-y-1.5">
                {activityRows.map((row, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-2.5 py-2 flex items-start gap-2"
                    style={{ backgroundColor: '#1A0B2E', ...fade(visibleActivity > i) }}
                  >
                    <span className="text-sm leading-none mt-0.5">{row.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white font-medium leading-tight">{row.title}</p>
                      <p className="text-[9px] leading-tight" style={{ color: '#6B7280' }}>{row.detail}</p>
                    </div>
                    {row.time && <span className="text-[8px] shrink-0" style={{ color: '#4B5563' }}>{row.time}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scene 3 — Leaderboard */}
        <div className="absolute inset-0 px-3 py-2.5" style={fade(scene === 3)}>
          {scene === 3 && (
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/80 font-medium">Top Affiliates</span>
                <span className="text-[9px]" style={{ color: '#A78BFA' }}>View All →</span>
              </div>
              <div className="grid grid-cols-[24px_1fr_60px_60px_50px] gap-1 mb-1.5 px-2">
                {['#', 'Affiliate', 'Installs', 'Revenue', 'Conv'].map(h => (
                  <span key={h} className="text-[8px] uppercase" style={{ color: '#4B5563' }}>{h}</span>
                ))}
              </div>
              {leaderboard.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[24px_1fr_60px_60px_50px] gap-1 items-center rounded-lg px-2 py-1.5 mb-1"
                  style={{
                    backgroundColor: row.highlight ? 'rgba(74,222,128,0.05)' : 'transparent',
                    ...fade(visibleLeader > i),
                  }}
                >
                  <span className="text-[9px]" style={{ color: '#6B7280' }}>{row.rank === 1 ? '🏆' : row.rank}</span>
                  <span className="text-[10px] text-white font-medium">{row.handle}</span>
                  <span className="text-[10px] text-white">{row.installs}</span>
                  <span className="text-[10px] text-white">{row.revenue}</span>
                  <span className="text-[10px]" style={{ color: '#4ADE80' }}>{row.conv}</span>
                </div>
              ))}
              <div
                className="absolute left-1/2 top-1 -translate-x-1/2 rounded-lg px-3 py-2 z-10 text-center"
                style={{ backgroundColor: '#2D1B69', ...fade(showTooltip) }}
              >
                <p className="text-[9px] text-white">✦ Top performer this month</p>
                <p className="text-[8px]" style={{ color: '#9CA3AF' }}>Drove 38% of total revenue</p>
              </div>
            </div>
          )}
        </div>

        {/* Scene 4 — Fraud Alert */}
        <div className="absolute inset-0 px-3 py-2.5" style={fade(scene === 4)}>
          {scene === 4 && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div style={fade(showScanning)} className="text-center">
                <span className="text-[10px] inline-flex items-center gap-1.5" style={{ color: '#9CA3AF' }}>
                  <span className="inline-block animate-spin" style={{ animationDuration: '2s' }}>◌</span>
                  AI monitoring affiliate activity...
                </span>
              </div>
              <div
                className="w-full max-w-[300px] rounded-xl p-3.5"
                style={{
                  backgroundColor: '#1A0F00',
                  borderLeft: '3px solid #F59E0B',
                  ...fade(showFraudAlert),
                  ...(alertPulse ? { animation: 'fraudPulse 1s ease-in-out' } : {}),
                }}
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span style={{ color: '#F59E0B' }}>⚠</span>
                  <span className="text-[11px] text-white font-bold">Fraud Alert Detected</span>
                </div>
                <div className="space-y-1.5 mb-3">
                  {[
                    ['Affiliate', '@user892'],
                    ['Installs', '47 installs'],
                    ['Pattern', 'Same IP range'],
                    ['Timeframe', '2 hours'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-[9px]" style={{ color: '#9CA3AF' }}>{label}</span>
                      <span className="text-[9px] text-white">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="text-[9px] px-2.5 py-1 rounded" style={{ border: '1px solid #F59E0B', color: '#F59E0B' }}>Review Details</button>
                  <button className="text-[9px] px-2.5 py-1" style={{ color: '#6B7280' }}>Dismiss</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scene dots */}
      <div className="flex items-center justify-center gap-2 pb-2.5">
        {[1, 2, 3, 4].map(s => (
          <div
            key={s}
            className="rounded-full"
            style={{
              width: scene === s ? 6 : 4,
              height: scene === s ? 6 : 4,
              backgroundColor: scene === s ? '#FFFFFF' : '#4C1D95',
              transition: 'all 400ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroDashboard;
