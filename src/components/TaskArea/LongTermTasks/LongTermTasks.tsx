import styles from './LongTermTasks.module.css';
import TaskList from '../TaskList/TaskList';

const LongTermTasks: React.FC<{ addingTask: boolean }> = ({ addingTask }) => {
  return (
    <div className={`${styles.longTermTasksDiv} placeholderDiv`}>
      <h3>Long-Term Tasks</h3>
      <TaskList taskType='long-term' addingTask={addingTask} />
    </div>
  );
};

export default LongTermTasks;
