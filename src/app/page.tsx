"use client";

import React, { useState, useEffect } from 'react';
import PixelOffice from '../components/acc/PixelOffice';
import TaskManager from '../components/acc/TaskManager';
import GlobalTerminal from '../components/acc/GlobalTerminal';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [tasks, setTasks] = useState<any>([]);
  const [logs, setLogs] = useState([
    { id: 1, text: 'SYSTEM: OFFICE_LOADER initialized...', type: 'info' },
    { id: 2, text: 'SUCCESS: Rendering Pixel Workspace', type: 'info' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/status');
        const json = await res.json();
        setData(json);

        // Fetch tasks (simulated from local lib)
        const taskRes = await import('../lib/tasks.json');
        setTasks(taskRes.tasks || []);
      } catch (e) {
        console.error('Fetch error:', e);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const agents = data?.agents || [];

  return (
    <main className="min-h-screen bg-[#2c1a1a] p-4 md:p-12 font-mono flex flex-col gap-8">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center text-white border-b-2 border-white/20 pb-4">
        <h1 className="text-2xl font-bold tracking-[0.2em]">ACC_OFFICE_v4.0 🤙</h1>
        <div className="text-xs text-right">
           <div>LOCAL SERVER: 78.153.155.86</div>
           <div>TIME: {data?.time || '--:--:--'}</div>
        </div>
      </div>

      {/* The REAL Pixel Office component & Task Manager */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        <div className="flex-1 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <PixelOffice agents={agents} />
        </div>
        
        <div className="lg:w-[350px] shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
          <TaskManager tasks={tasks} />
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="h-48 border-4 border-black group">
        <GlobalTerminal logs={logs as any} />
      </div>

      <footer className="text-[10px] text-white/40 flex justify-between uppercase">
        <span>[ CPU: {data?.cpu || '0%'} ] [ MEM: {data?.ram || '0%'} ]</span>
        <span className="animate-pulse">BUILDING_SAAS_DREAMS_...</span>
      </footer>
    </main>
  );
}
