import { useState } from 'react';
import usePostPutPatchDelete from '../../hooks/usePostPutPatchDelete';
import { PostPutPatchTaskResponse, TaskData } from '../../types';

const TaskBox: React.FC<{ task: TaskData }> = ({ task }) => {
  const [complete, setComplete] = useState(task.task_complete);
  const [messageVisible, setMessageVisible] = useState(false);
  const { data, error, loading, sendRequest } = usePostPutPatchDelete<
    { id: number; task_complete: boolean },
    PostPutPatchTaskResponse
  >('tasks', 'PATCH');

  const handleChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    setComplete(!complete); // Flip the local completion state
    sendRequest({ id: task.id, task_complete: complete }); // Trigger the request
    setMessageVisible(true); // Show the response message
    const timer = setTimeout(() => setMessageVisible(false), 2500); // Hide the message after 2.5s
    return () => clearTimeout(timer); // Cleanup in case the component unmounts early
  };

  return (
    <>
      <label>
        <input type='checkbox' checked={complete} onChange={handleChange} />
        {task.task_name}
      </label>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to update task: {error.message}</p>}
      {data && messageVisible && (
        <p>
          <i>{data.message}</i>
        </p>
      )}
    </>
  );
};

export default TaskBox;
