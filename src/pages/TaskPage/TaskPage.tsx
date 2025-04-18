import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/Auth';
import { AuthUserData, BalanceData } from '../../types';
import GameCanvas from '../../components/GameCanvas/GameCanvas';
import TaskArea from '../../components/TaskArea/TaskArea';
import styles from './TaskPage.module.css';
import useGetRequest from '../../hooks/useGetRequest';

interface BalanceContextType {
  userBalance: number | null;
  setUserBalance: Dispatch<SetStateAction<number | null>>;
}

// lets us pass user data to all child components
export const UserContext = createContext<AuthUserData | null>(null);
export const BalanceContext = createContext<BalanceContextType>({
  userBalance: null,
  setUserBalance: () => {},
});

const TaskPage = () => {
  const { data, sendRequest } = useGetRequest<BalanceData>('balance', true);
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUserData | null>(null);
  const [userBalance, setUserBalance] = useState<number | null>(0);

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
      <BalanceContext.Provider value={{ userBalance, setUserBalance }}>
        <div className={styles.taskPageDiv}>
          <div className={styles.gameAreaDiv}>
            <GameCanvas />
          </div>
          <TaskArea />
        </div>
      </BalanceContext.Provider>
    </UserContext.Provider>
  );
};

export default TaskPage;
