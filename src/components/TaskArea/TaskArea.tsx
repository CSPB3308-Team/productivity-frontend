import LongTermTasks from './LongTermTasks/LongTermTasks';
import ShortTermTasks from './ShortTermTasks/ShortTermTasks';
import styles from './TaskArea.module.css';

const TaskArea = () => {
  return (
    <div className={`${styles.taskAreaDiv} placeholderDiv`}>
      <LongTermTasks />
      <ShortTermTasks />
    </div>
  );
};

export default TaskArea;
