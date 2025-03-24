import { useState } from 'react';
import LongTermTasks from './LongTermTasks/LongTermTasks';
import ShortTermTasks from './ShortTermTasks/ShortTermTasks';
import styles from './TaskArea.module.css';
import AddTask from './AddDeleteTask/AddTask';

const TaskArea = () => {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <div className={`${styles.taskAreaDiv} placeholderDiv`}>
      {addingTask && <AddTask setAddingTask={setAddingTask} />}
      <button className={styles.addTaskButton} type='button' onClick={() => setAddingTask(true)}>
        Add Task
      </button>
      <LongTermTasks addingTask={addingTask} />
      <ShortTermTasks addingTask={addingTask} />
    </div>
  );
};

export default TaskArea;
