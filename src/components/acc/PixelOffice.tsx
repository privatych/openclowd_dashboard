import React, { useState, useEffect } from 'react';

const ProgressBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', marginBottom: '2px', color: '#fff' }}>
      <span>{label}</span>
      <span>{value}/100</span>
    </div>
    <div style={{ width: '100%', height: '10px', backgroundColor: '#1a1a1a', border: '2px solid #000', padding: '1px' }}>
      <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, transition: 'width 0.5s ease-out', boxShadow: `0 0 5px ${color}` }}></div>
    </div>
  </div>
);

const AgentSprite = ({ agent }: { agent: any }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isBusy = agent.status === 'busy';
  const hp = Math.floor(Math.random() * 30) + 70;
  const mp = Math.floor(Math.random() * 50) + 50;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
         onMouseEnter={() => setShowDetails(true)}
         onMouseLeave={() => setShowDetails(false)}>
      
      {showDetails && (
        <div style={{
          position: 'absolute', top: '-190px', left: '50%', transform: 'translateX(-50%)',
          width: '260px', backgroundColor: '#0b0f19', border: '4px double #ec4899', padding: '12px',
          zIndex: 100, boxShadow: '10px 10px 0 rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px'
        }}>
          <div style={{ color: '#ec4899', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px', borderBottom: '2px dashed #333', paddingBottom: '4px' }}>
             LVL.15 {agent.title.toUpperCase()}
          </div>
          <ProgressBar label="INTEGRITY (HP)" value={hp} color="#4ade80" />
          <ProgressBar label="RESOURCES (MP)" value={mp} color="#3b82f6" />
          <div style={{ marginTop: '10px', color: '#00ffff', fontSize: '9px', borderTop: '1px solid #222', paddingTop: '8px' }}>
            {"> MODEL: "}{agent.model}<br/>
            {"> TASK: "}<span style={{color: '#fff', fontStyle: 'italic'}}>"{agent.task}"</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
             <button style={{ flex: 1, backgroundColor: '#ec4899', color: '#000', border: '2px solid #000', fontSize: '8px', fontWeight: 'bold', padding: '4px', cursor: 'pointer' }}>REBOOT</button>
             <button style={{ flex: 1, backgroundColor: '#fff', color: '#000', border: '2px solid #000', fontSize: '8px', fontWeight: 'bold', padding: '4px', cursor: 'pointer' }}>SYNC</button>
          </div>
        </div>
      )}

      {/* Desk Setup */}
      <div style={{ width: '84px', height: '64px', backgroundColor: '#5d4037', border: '4px solid #2d1b11', boxShadow: '8px 8px 0 rgba(0,0,0,0.2)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-18px', left: '18px', width: '44px', height: '32px', backgroundColor: '#222', border: '3px solid #000' }}>
          <div style={{ width: '36px', height: '24px', backgroundColor: isBusy ? '#00ffff' : '#111', boxShadow: isBusy ? '0 0 15px #00ffff' : 'none', position: 'relative', overflow: 'hidden' }}>
             {isBusy && <div className="matrix-code" style={{ color: '#000', fontSize: '6px', lineHeight: '6px' }}>101010101010101010</div>}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '8px', right: '6px', width: '14px', height: '14px', backgroundColor: '#f5f5f5', border: '2px solid #000' }}>
           <div style={{ width: '6px', height: '8px', backgroundColor: '#4e342e', margin: '1px auto' }}></div>
        </div>
      </div>

      <div style={{
        width: '44px', height: '44px', backgroundColor: agent.status === 'offline' ? '#444' : '#303f9f',
        border: '4px solid #000', borderRadius: '50%', position: 'absolute', bottom: '-18px',
        animation: isBusy ? 'work-jump 0.4s infinite alternate' : 'none', zIndex: 10
      }}>
        <div style={{ width: '24px', height: '24px', backgroundColor: '#ffcc80', border: '2px solid #000', borderRadius: '50%', margin: '6px auto' }}></div>
      </div>

      <div style={{ marginTop: '22px', backgroundColor: isBusy ? '#4ade80' : '#000', color: isBusy ? '#000' : '#fff', fontSize: '9px', padding: '2px 10px', border: '2px solid #fff', fontWeight: 'bold' }}>
        {agent.title.split(' ')[0]}
      </div>
    </div>
  );
};

const PixelOffice = ({ agents }: { agents: any[] }) => {
  return (
    <div style={{
      backgroundColor: '#bd9a7a', padding: '80px', minHeight: '650px', border: '16px double #3e2723',
      position: 'relative', backgroundImage: 'radial-gradient(#a38469 3px, transparent 0)', backgroundSize: '32px 32px'
    }}>
      {/* HUD - GOLD & INCOME */}
      <div style={{ position: 'absolute', top: '25px', right: '30px', backgroundColor: '#000', border: '4px solid #facc15', padding: '8px 15px', color: '#facc15', fontSize: '14px', fontWeight: 'bold', boxShadow: '6px 6px 0 rgba(0,0,0,0.4)', zIndex: 50 }}>
        DAILY_SPEND: <span style={{color: '#fff'}}>$1.24</span> <span style={{fontSize: '10px'}}>💎</span>
      </div>

      <div style={{ position: 'absolute', top: '25px', left: '30px', backgroundColor: '#4caf50', border: '4px solid #000', padding: '8px 20px', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '6px 6px 0 rgba(0,0,0,1)', zIndex: 50 }}>
        ACC_OFFICE_CORE 🤙
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '100px 50px', marginTop: '100px' }}>
        {agents.map((a: any) => <AgentSprite key={a.id} agent={a} />)}
      </div>

      {/* OFFICE INTERIOR */}
      <div style={{ position: 'absolute', bottom: '20px', left: '30px', border: '4px solid #000', backgroundColor: '#333', color: '#00ff00', fontSize: '10px', padding: '10px' }}>
         COFFEE_BOT [V1.0]: <span className="steam">♨️</span> BREWING_DARK_ROAST...
      </div>

      <style>{`
        @keyframes work-jump { from { transform: translateY(0); } to { transform: translateY(-10px); } }
        .matrix-code { animation: scroll-v 1s linear infinite; }
        @keyframes scroll-v { from { transform: translateY(0); } to { transform: translateY(-20px); } }
        .steam { display: inline-block; animation: wave 2s ease-in-out infinite; }
        @keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
};

export default PixelOffice;
