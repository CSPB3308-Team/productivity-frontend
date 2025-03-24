import { useEffect, useState } from 'react';
import useGetRequest from '../../../hooks/useGetRequest';
import { TaskData } from '../../../types';
import styles from './ShortTermTasks.module.css';
import TaskBox from '../TaskBox';

const ShortTermTasks = () => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const { data, error, loading, sendRequest } = useGetRequest<TaskData[]>('tasks');

  // Initially get the tasks
  useEffect(() => {
    sendRequest({ task_type: 'short-term' });
  }, [sendRequest]);

  // Set the initial tasks to local state
  useEffect(() => {
    if (data) setTasks(data);
  }, [data, setTasks]);

  return (
    <div className={`${styles.shortTermTasksDiv} placeholderDiv`}>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to get tasks: {error.message}</p>}
      {tasks && (
        <>
          {tasks.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </>
      )}
    </div>
  );
};

export default ShortTermTasks;
