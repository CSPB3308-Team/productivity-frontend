import GameCanvas from '../../components/GameCanvas/GameCanvas';
import TaskArea from '../../components/TaskArea/TaskArea';
import styles from './TaskPage.module.css';
import AuthService from '../../utils/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const navigate = useNavigate();

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    if (!AuthService.loggedIn()) navigate('/login');
  }, [navigate]);

  return (
    <div className={styles.taskPageDiv}>
      <div className={styles.gameAreaDiv}>
          <GameCanvas />
      </div>
      <TaskArea />
    </div>
  );
};

export default TaskPage;
