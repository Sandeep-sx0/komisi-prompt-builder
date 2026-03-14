import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  text: string;
  color: "white" | "green" | "blue" | "dim";
  delay: number;
}

const lines: TerminalLine[] = [
  { text: "$ komisi init", color: "white", delay: 600 },
  { text: "", color: "dim", delay: 300 },
  { text: "✔ Fetching SDK...", color: "green", delay: 800 },
  { text: "✔ SDK installed (v2.1.0)", color: "green", delay: 600 },
  { text: "✔ API key configured", color: "green", delay: 500 },
  { text: "", color: "dim", delay: 400 },
  { text: "KomisiSDK.configure(", color: "blue", delay: 300 },
  { text: '  apiKey: "your_key"', color: "blue", delay: 300 },
  { text: ")", color: "blue", delay: 200 },
  { text: "KomisiSDK.resolve()", color: "blue", delay: 400 },
  { text: "", color: "dim", delay: 400 },
  { text: "✔ Ready. Listening for events.", color: "green", delay: 600 },
];

const colorMap: Record<string, string> = {
  white: "text-gray-100",
  green: "text-emerald-400",
  blue: "text-blue-300",
  dim: "text-gray-500",
};

export const TerminalAnimation: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  useEffect(() => {
    if (visibleLines < lines.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines((p) => p + 1);
      }, lines[visibleLines].delay);
    } else {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(0);
      }, 2500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visibleLines]);

  return (
    <div className="w-full h-full flex flex-col rounded-lg overflow-hidden" style={{ background: "#0D1117" }}>
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-gray-500 font-mono">terminal</span>
      </div>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex-1 px-4 py-3 font-mono text-xs leading-[1.7] overflow-hidden"
      >
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={colorMap[line.color]}>
            {line.text || "\u00A0"}
          </div>
        ))}
        <span className={`inline-block w-[7px] h-3.5 align-middle ${showCursor ? "bg-gray-300" : "bg-transparent"}`} />
      </div>
    </div>
  );
};
