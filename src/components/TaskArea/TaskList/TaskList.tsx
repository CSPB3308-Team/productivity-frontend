import { useEffect, useState } from 'react';
import useGetRequest from '../../../hooks/useGetRequest';
import { TaskData, TaskType } from '../../../types';
import styles from './TaskList.module.css';
import TaskBox from './TaskBox';

type TaskListProps = {
  taskType: TaskType;
  addingTask: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ taskType, addingTask }) => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const { data, error, loading, sendRequest } = useGetRequest<TaskData[]>('tasks');

  // Initially get the tasks
  useEffect(() => {
    sendRequest({ task_type: taskType });
    // Depend on addingTask so that the list will update when a new task is added
  }, [sendRequest, taskType, addingTask]);

  // Set the initial tasks to local state
  useEffect(() => {
    if (data) setTasks(data);
  }, [data, setTasks]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to get tasks: {error.message}</p>}
      {tasks && (
        <div className={styles.taskListDiv}>
          {tasks.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
