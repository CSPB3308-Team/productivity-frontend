import GameCanvas from '../../components/GameCanvas/GameCanvas';
import TaskArea from '../../components/TaskArea/TaskArea';
import styles from './TaskPage.module.css';

const TaskPage = () => {
  return (
    <div className={styles.taskPageDiv}>
      <GameCanvas />
      <TaskArea />
    </div>
  );
};

export default TaskPage;
