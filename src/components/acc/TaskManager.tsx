import React from 'react';

const TaskCard = ({ task }: { task: any }) => {
  const priorityColor = task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#facc15' : '#4ade80';
  
  return (
    <div style={{
      backgroundColor: '#000', border: '3px solid #666', marginBottom: '10px', padding: '10px',
      boxShadow: '4px 4px 0 rgba(0,0,0,0.5)', position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#666', fontSize: '8px' }}>#{task.id} / {task.agent.toUpperCase()}</span>
        <div style={{ width: '8px', height: '8px', backgroundColor: priorityColor }}></div>
      </div>
      <div style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>{task.title}</div>
      <div style={{ marginTop: '8px', fontSize: '10px', color: task.status === 'done' ? '#4ade80' : '#ec4899' }}>
        [{task.status.toUpperCase()}]
      </div>
    </div>
  );
};

const TaskManager = ({ tasks }: { tasks: any[] }) => {
  return (
    <div style={{
      backgroundColor: '#111', border: '6px double #666', padding: '20px', minWidth: '300px',
      maxHeight: '600px', overflowY: 'auto', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ color: '#fff', fontSize: '18px', borderBottom: '3px solid #ec4899', paddingBottom: '10px', marginBottom: '20px' }}>
         📋 TASK_MANAGER
      </h2>
      <div className="custom-scrollbar">
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
      
      {/* Input Placeholder */}
      <div style={{ marginTop: '20px', borderTop: '2px dashed #444', paddingTop: '15px' }}>
         <div style={{ color: '#666', fontSize: '9px', marginBottom: '5px' }}>{'> NEW TASK:'}</div>
         <div style={{ backgroundColor: '#000', border: '1px solid #4ade80', height: '20px', color: '#4ade80', fontSize: '10px', padding: '0 5px', display: 'flex', alignItems: 'center' }}>
            _
         </div>
      </div>
    </div>
  );
};

export default TaskManager;
