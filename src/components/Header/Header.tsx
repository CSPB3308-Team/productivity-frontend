import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <h1>Taskagotchi</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
