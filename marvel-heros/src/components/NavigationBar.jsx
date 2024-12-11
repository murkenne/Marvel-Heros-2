import { Link } from 'react-router-dom';
import styles from './Marvel.module.css'; 

export default function NavigationBar() {
  return (
    <main>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to='/' className={styles.navLink}>Home Page</Link></li>
          <li className={styles.navItem}><Link to='/browse-characters' className={styles.navLink}>Browse Characters</Link></li>
          <li className={styles.navItem}><Link to='/character-details' className={styles.navLink}>Character Details</Link></li>
          <li className={styles.navItem}><Link to='/comics' className={styles.navLink}>Comics</Link></li>
        </ul>
      </nav>
    </main>
  );
}
