import { useEffect, useState } from 'react';
import usePostPutPatchDelete from '../../../hooks/usePostPutPatchDelete';
import { PostPutPatchTaskResponse, TaskData } from '../../../types';
import DeleteTask from '../AddDeleteTask/DeleteTask';

const TaskBox: React.FC<{ task: TaskData }> = ({ task }) => {
  const [complete, setComplete] = useState(task.task_complete);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { data, error, loading, sendRequest } = usePostPutPatchDelete<
    { id: number; task_complete: boolean },
    PostPutPatchTaskResponse
  >('tasks', 'PATCH');

  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => setMessageVisible(false), 2500); // Hide the message after 2.5s
      return () => clearTimeout(timer); // Cleanup in case the component unmounts early
    }
  }, [messageVisible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked; // Capture the checked state
    setComplete(checked); // Set the component state (asynchronous)
    sendRequest({ id: task.id, task_complete: checked }); // Trigger the request using the checked state
    setMessageVisible(true); // Show the response message
  };

  // Temporarily hide the component as soon as the user deletes the task. The component will be
  // fully removed the next time another request is made to the database.
  if (isDeleted) return <></>;

  return (
    <>
      {deletingTask && (
        <DeleteTask task={task} setDeletingTask={setDeletingTask} setIsDeleted={setIsDeleted} />
      )}
      <label>
        <input type='checkbox' checked={complete} onChange={handleChange} />
        {task.task_name}
        <button type='button' onClick={() => setDeletingTask(true)}>
          Delete
        </button>
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
