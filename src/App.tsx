import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import TaskPage from './pages/TaskPage/TaskPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AccountPage from './pages/AccountPage/AccountPage';
import AboutPage from './pages/AboutPage/AboutPage';
import TipsPage from './pages/TipsPage/TipsPage';
import MainLayout from './layouts/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter basename='/productivity-frontend'>
      <header className="p-3 mb-3 border-bottom bg-light">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <h1 className="fs-4">Productivity App</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => `btn me-2 ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>Tasks</NavLink>
            <NavLink to="/about" className={({ isActive }) => `btn me-2 ${isActive ? 'btn-secondary' : 'btn-outline-secondary'}`}>About</NavLink>
            <NavLink to="/tips" className={({ isActive }) => `btn ${isActive ? 'btn-success' : 'btn-outline-success'}`}>Productivity Tips</NavLink>
          </nav>
        </div>
      </header>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<TaskPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/tips' element={<TipsPage />} />
        </Route>
      </Routes>
      <footer className="mt-5 py-3 border-top bg-light text-center">
        <div className="container">
          <span className="text-muted">© 2025 Productivity App. All rights reserved.</span>
        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;
