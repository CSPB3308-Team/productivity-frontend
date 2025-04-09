import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskPage from './pages/TaskPage/TaskPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
