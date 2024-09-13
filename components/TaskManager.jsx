import  { useState } from 'react';
import TaskDetails from './TaskDetails';
import TaskList from './TaskList';

// const tasks = [
//   { id: 1, title: 'Tâche 1', description: 'Détails de la tâche 1' },
//   { id: 2, title: 'Tâche 2', description: 'Détails de la tâche 2' },
//   { id: 3, title: 'Tâche 3', description: 'Détails de la tâche 3' },
//   { id: 4, title: 'Tâche 4', description: 'Détails de la tâche 4' },
//   { id: 5, title: 'Tâche 5', description: 'Détails de la tâche 6' },
//   { id: 6, title: 'Tâche 6', description: 'Détails de la tâche 6' },
//   { id: 7, title: 'Tâche 7', description: 'Détails de la tâche 7' },
//   { id: 8, title: 'Tâche 8', description: 'Détails de la tâche 8' },
//   { id: 9, title: 'Tâche 9', description: 'Détails de la tâche 9' },
// ];


const TaskManager = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="task-manager">
      <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
      <TaskDetails task={selectedTask} />
    </div>
  );
};



export default TaskManager;


