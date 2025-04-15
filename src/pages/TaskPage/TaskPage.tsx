import GameCanvas from '../../components/GameCanvas/GameCanvas';
import TaskArea from '../../components/TaskArea/TaskArea';
import styles from './TaskPage.module.css';
import AuthService from '../../utils/Auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryBox from './InventoryBox'
import InventoryIcon from './InventoryIcon';
import InventoryIconHover from './InventoryIconHover'

const TaskPage = () => {
  const navigate = useNavigate();

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    if (!AuthService.loggedIn()) navigate('/login');
  }, [navigate]);

  const [invHover, setInvHover] = useState(false);

  function mouseInvHover() {
    setInvHover(true);
  }

  function mouseInvLeave() {
    setInvHover(false);
  }

  return (
    <div className={styles.taskPageDiv}>
      <div className={styles.gameAreaDiv}>
        <div className={styles.gameCanvasDiv}>

          {/* INVENTORY MENU */}
          <div className={styles.inventoryDiv}>
            <InventoryBox />
            <div className={styles.inventoryIconDiv} 
              onMouseEnter={() => mouseInvHover()}
              onMouseLeave={() => mouseInvLeave()}>
              {invHover ? <InventoryIconHover/> : <InventoryIcon/>}
            </div>
            
          </div>
          <GameCanvas />
        </div>
      </div>
      <TaskArea />
    </div>
  );
};

export default TaskPage;
