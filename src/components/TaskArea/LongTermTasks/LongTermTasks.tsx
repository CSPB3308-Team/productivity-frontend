import { useEffect } from 'react';
import styles from './LongTermTasks.module.css';

const LongTermTasks: React.FC<{ addingTask: boolean }> = ({ addingTask }) => {
  useEffect(() => {
    if (addingTask)
      console.log('Long-term tasks knows that a task is being added! (This is a placeholder)');
  }, [addingTask]);

  return (
    <div className={`${styles.longTermTasksDiv} placeholderDiv`}>
      <p>Here is where long-term tasks will go!</p>
    </div>
  );
};

export default LongTermTasks;
