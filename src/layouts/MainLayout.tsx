import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="mt-5 py-3 border-top bg-primary text-center">
        <div className="container">
          <span className="text-muted">© 2025 Productivity App. All rights reserved.</span>  
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
