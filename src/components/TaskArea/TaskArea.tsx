import { useState } from 'react';
import LongTermTasks from './LongTermTasks/LongTermTasks';
import ShortTermTasks from './ShortTermTasks/ShortTermTasks';
import AddTask from './AddDeleteTask/AddTask';

const TaskArea = () => {
  const [addingTask, setAddingTask] = useState(false);

  const handleClick = () => setAddingTask(true);

  return (
    <div className="d-flex flex-column w100">
      {addingTask && <AddTask setAddingTask={setAddingTask} />}
      <button className="w-100 mb-3 btn btn-primary" type='button' onClick={handleClick}>
        Add Task
      </button>
      <LongTermTasks addingTask={addingTask} />
      <ShortTermTasks addingTask={addingTask} />
    </div>
  );
};

export default TaskArea;
