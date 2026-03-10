import React from 'react';

const PixelCard = ({ title, status, model, task }: { title: string, status: 'online' | 'offline' | 'busy', model: string, task: string }) => {
  const statusColor = status === 'online' ? 'text-green-400' : status === 'busy' ? 'text-yellow-400' : 'text-red-500';
  const shadowColor = status === 'online' ? 'shadow-[0_0_15px_rgba(74,222,128,0.5)]' : status === 'busy' ? 'shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.5)]';

  return (
    <div className={`p-4 border-4 border-cyan-400 bg-black font-mono relative ${shadowColor} transition-all duration-300`}>
      {/* Pixelated title bar */}
      <div className="bg-cyan-400 text-black px-2 py-1 mb-3 inline-block font-bold">
        {title.toUpperCase()}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">{'> STATUS:'}</span>
          <span className={`${statusColor} animate-pulse`}>[{status.toUpperCase()}]</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">{'> MODEL:'}</span>
          <span className="text-pink-500 font-pixel">{model}</span>
        </div>

        <div className="mt-4 pt-2 border-t-2 border-gray-800">
          <div className="text-gray-500 mb-1">{'> CURRENT TASK:'}</div>
          <div className="text-cyan-300 text-xs italic">
            "{task}"
          </div>
        </div>
      </div>

      {/* Decorative pixel corners */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-pink-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-500"></div>
    </div>
  );
};

export default PixelCard;
