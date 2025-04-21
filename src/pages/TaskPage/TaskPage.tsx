import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/Auth';
import { AuthUserData, BalanceData, TaskData } from '../../types';
import GameCanvas from '../../components/GameCanvas/GameCanvas';
import TaskArea from '../../components/TaskArea/TaskArea';
import styles from './TaskPage.module.css';
import useGetRequest from '../../hooks/useGetRequest';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface BalanceContextType {
  userBalance: number | null;
  setUserBalance: Dispatch<SetStateAction<number | null>>;
}

interface TaskContextType {
  longTasks: TaskData[] | null;
  shortTasks: TaskData[] | null;
  dailyTasks: TaskData[] | null;
  setLongTasks: Dispatch<SetStateAction<TaskData[] | null>>;
  setShortTasks: Dispatch<SetStateAction<TaskData[] | null>>;
  setDailyTasks: Dispatch<SetStateAction<TaskData[] | null>>;
}

// lets us pass user data to all child components
export const UserContext = createContext<AuthUserData | null>(null);
export const TaskContext = createContext<TaskContextType>({
  longTasks: null,
  shortTasks: null,
  dailyTasks: null,
  setLongTasks: () => { },
  setShortTasks: () => { },
  setDailyTasks: () => { }
});
export const BalanceContext = createContext<BalanceContextType>({
  userBalance: null,
  setUserBalance: () => { },
});

const TaskPage = () => {
  const { data, sendRequest } = useGetRequest<BalanceData>('balance', true);
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUserData | null>(null);
  const [userBalance, setUserBalance] = useState<number | null>(0);
  const [longTasks, setLongTasks] = useState<TaskData[] | null>(null)
  const [shortTasks, setShortTasks] = useState<TaskData[] | null>(null)
  const [dailyTasks, setDailyTasks] = useState<TaskData[] | null>(null)

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    if (!AuthService.loggedIn()) navigate('/login');
  }, [navigate]);

  // get user
  useEffect(() => {
    async function getUser() {
      const loggedInUser = AuthService.getUser();
      setUser(loggedInUser);
    }
    getUser();
  }, []);

  // get user wallet
  useEffect(() => {
    if (user) {
      sendRequest({});
    }
  }, [user, sendRequest]);

  // Add initial balance to state
  useEffect(() => {
    if (data) setUserBalance(data.balance);
  }, [data, setUserBalance]);

  return (
    <UserContext.Provider value={user}>
      <TaskContext.Provider value={{ longTasks, shortTasks, dailyTasks, 
                                  setLongTasks, setShortTasks, setDailyTasks }}>
        <BalanceContext.Provider value={{ userBalance, setUserBalance }}>

          <Container fluid>
            <Row className="g-0 container">
              <Col lg={10} md={9} sm={12} className={styles.gameCol}>
                <div className={styles.gameWrapper}>
                  <GameCanvas />
                </div>
              </Col>
              <Col lg={2} md={3} sm={12} className={styles.taskCol}>
                <TaskArea />
              </Col>
            </Row>
          </Container>

        </BalanceContext.Provider>
      </TaskContext.Provider>
    </UserContext.Provider>
  );
};

export default TaskPage;
