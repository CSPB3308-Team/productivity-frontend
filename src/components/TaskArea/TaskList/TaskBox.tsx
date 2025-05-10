import { useContext, useEffect, useState } from 'react';
import usePostPutPatchDelete from '../../../hooks/usePostPutPatchDelete';
import { BalanceData, PostPutPatchTaskResponse, TaskData } from '../../../types';
import DeleteTask from '../AddDeleteTask/DeleteTask';
import Card from 'react-bootstrap/Card';
import AuthService from '../../../utils/Auth';
import { BalanceContext } from '../../../pages/TaskPage/TaskPage';

interface taskMessage {
  id: number;
  task_complete: boolean;
  task_renewed?: boolean;
}

const TaskBox: React.FC<{ task: TaskData }> = ({ task }) => {
  const { setUserBalance } = useContext(BalanceContext);
  const [complete, setComplete] = useState(task.task_complete);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isRenewed, setIsRenewed] = useState(task.task_renewed);

  const { data, error, loading, sendRequest } = usePostPutPatchDelete<
    { id: number; task_complete: boolean },
    PostPutPatchTaskResponse
  >('tasks', 'PATCH');

  const balancePost = usePostPutPatchDelete<{ amount: number }, BalanceData>(
    'balance',
    'POST',
    { Authorization: `Bearer ${AuthService.getToken()}` }
  );

  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => setMessageVisible(false), 2500); // Hide the message after 2.5s
      return () => clearTimeout(timer); // Cleanup in case the component unmounts early
    }
  }, [messageVisible]);

  // updates user balance when they mark a task as complete
  useEffect(() => {
    if (balancePost.data) {
      setUserBalance(balancePost.data.balance);
    }
  }, [balancePost.data])

  async function updateBalance() {
    let reward: number;

    switch (task.task_type) {
      case 'long-term':
        reward = 50;
        break;
      case 'short-term':
        reward = 25;
        break;
      case 'daily':
        reward = 10;
        break;
      default:
        reward = 0;
    }

    await balancePost.sendRequest({ amount: reward });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked; // Capture the checked state
    setComplete(checked); // Set the component state (asynchronous)

    let message: taskMessage = {
      id: task.id,
      task_complete: checked
    }

    // if user is unchecking a task, set renewed to true so  that 
    // we don't give rewards multiple times
    if (checked == false && isRenewed == false) {
      setIsRenewed(true);
      message.task_renewed = true;
    }

    sendRequest(message); // Trigger the request using the checked state
    setMessageVisible(true); // Show the response message

    // if user marked task as complete, and the task hasn't been renewed, 
    // update their balance with their reward
    if (checked == true && isRenewed == false) {
      updateBalance();
    }
  };

  // Temporarily hide the component as soon as the user deletes the task. The component will be
  // fully removed the next time another request is made to the database.
  if (isDeleted) return <></>;

  return (
    <>
      {deletingTask && (
        <DeleteTask task={task} setDeletingTask={setDeletingTask} setIsDeleted={setIsDeleted} />
      )}
      <Card className="d-flex flex-row align-items-center justify-content-between p-2 mb-2">
        <input type='checkbox' checked={complete} onChange={handleChange} />
        <Card.Text className="mb-3 p-3">{task.task_name}</Card.Text>
        <button className="btn btn-danger" type='button' onClick={() => setDeletingTask(true)}>
          Delete
        </button>
      </Card>
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
