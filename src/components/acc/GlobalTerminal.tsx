import React from 'react';

const GlobalTerminal = ({ logs }: { logs: Array<{ id: number, text: string, type: 'info' | 'warn' | 'error' }> }) => {
  return (
    <div className="bg-black border-4 border-pink-500 p-4 font-mono shadow-[0_0_20px_rgba(236,72,153,0.3)] min-h-[200px] relative overflow-hidden">
      <div className="bg-pink-500 text-black px-3 py-1 mb-2 font-bold inline-block">
        SYSTEM LOGS
      </div>

      <div className="space-y-1 text-xs max-h-48 overflow-y-auto custom-scrollbar">
        {logs.map(log => (
          <div key={log.id} className="flex gap-2">
            <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.type === 'error' ? 'text-red-500' : log.type === 'warn' ? 'text-yellow-400' : 'text-green-400'}>
              {log.text}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-green-400">_</div>
      </div>

      {/* Retro scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default GlobalTerminal;
