import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskPage from './pages/TaskPage/TaskPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;
