import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className='bg-primary text-white d-flex mb-4'>
      <div className='container d-flex flex-row justify-content-sm-between  align-items-center'>
        <img
          src="taskagotchi_icon_transparent.ico"
          alt="Taskagotchi Egg Icon"
          className={styles.logo}
        />
        <h1>Taskagotchi</h1>
      <nav>
      <ul className={`${styles.navList} list-unstyled d-flex align-items-center justify-content-sm-between
`}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;