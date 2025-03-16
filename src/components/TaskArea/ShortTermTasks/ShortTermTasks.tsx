import { useEffect } from 'react';
import useGetRequest from '../../../hooks/useGetRequest';
import { TaskData } from '../../../types';
import styles from './ShortTermTasks.module.css';

const ShortTermTasks = () => {
  const { data, error, loading, sendRequest } = useGetRequest<TaskData[]>('tasks');

  useEffect(() => {
    sendRequest({ task_type: 'short-term' });
  }, [sendRequest]);

  return (
    <div className={`${styles.shortTermTasksDiv} placeholderDiv`}>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to get tasks: {error.message}</p>}
      {data && (
        <>
          {data.map((task) => (
            <div key={task.id}>
              <label>
                <input type='checkbox' checked={task.task_complete} />
                {task.task_name}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ShortTermTasks;
