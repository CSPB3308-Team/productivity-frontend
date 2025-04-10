import { useEffect, useState } from 'react';
import useGetRequest from '../../../hooks/useGetRequest';
import { TaskData, TaskType } from '../../../types';
import styles from './TaskList.module.css';
import TaskBox from './TaskBox';
import AuthService from '../../../utils/Auth';
import { AuthUserData } from '../../../types';
import { bool } from 'three/tsl';

type TaskListProps = {
  taskType: TaskType;
  addingTask: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ taskType, addingTask }) => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const { data, error, loading, sendRequest } = useGetRequest<TaskData[]>('tasks');
  const [user, setUser] = useState<AuthUserData | null>(null);

  // Check if user is logged in
  useEffect(() => {
    async function getUser() {
    // const loggedInUser = AuthService.getUser();
    const loggedInUser = AuthService.getUser();
    console.log('Retrieved User:', loggedInUser);
    // if (loggedInUser) {
    //   setUser(loggedInUser);
    // } 
    
      setUser(loggedInUser);
    }

    getUser();
  // TODO: redirect to login page if user is not logged in
  }, []);

  // Initially get the tasks 
  useEffect(() => {
      console.log('Retrieved User:', user);
      if (user) {
        sendRequest({ task_type: taskType, user_id: String(user.id)});
      // Depend on addingTask so that the list will update when a new task is added
      }
  }, [sendRequest, taskType, addingTask, user]);

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
