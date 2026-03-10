import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Безопасный способ получить загрузку (без top)
    const { stdout: uptime } = await execAsync('uptime');
    // Безопасный RAM (в мегабайтах)
    const { stdout: mem } = await execAsync("free -m | awk 'NR==2{print $3 \",\" $2}'");
    
    const [usedMem, totalMem] = mem.trim().split(',');
    const ramPercent = ((parseInt(usedMem) / parseInt(totalMem)) * 100).toFixed(1) + '%';
    const cpuLoad = uptime.split('load average:')[1].split(',')[0].trim();

    return NextResponse.json({
      cpu: cpuLoad,
      ram: ramPercent,
      time: new Date().toLocaleTimeString(),
      agents: [
        { id: 1, title: 'Artie (Designer)', status: 'online', model: 'Gemini 3 Flash', task: 'Monitoring ACC UI integrity' },
        { id: 2, title: 'Codey (Backend)', status: 'busy', model: 'Claude 3.5 Sonnet', task: 'Serving ACC API routes' },
        { id: 3, title: 'Fixer (Debugger)', status: 'online', model: 'GPT-4o', task: 'Idle / Ready for fixes' },
        { id: 4, title: 'Testy (QA)', status: 'offline', model: 'N/A', task: 'Waiting for deployment' }
      ]
    });
  } catch (error) {
    // Если команды не сработали, возвращаем дефолтные значения вместо 500 ошибки
    return NextResponse.json({
      cpu: 'N/A',
      ram: 'N/A',
      time: new Date().toLocaleTimeString(),
      agents: [
        { id: 1, title: 'Artie (Designer)', status: 'online', model: 'Gemini 3 Flash', task: 'Running in safe mode' },
        { id: 2, title: 'Codey (Backend)', status: 'busy', model: 'Claude 3.5 Sonnet', task: 'API Fallback active' },
        { id: 3, title: 'Fixer (Debugger)', status: 'online', model: 'GPT-4o', task: 'System check required' },
        { id: 4, title: 'Testy (QA)', status: 'offline', model: 'N/A', task: 'Pending' }
      ]
    });
  }
}
