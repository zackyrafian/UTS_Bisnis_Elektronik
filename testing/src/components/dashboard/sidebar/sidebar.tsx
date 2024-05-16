import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css'; // Import CSS module file
import { handleLogout } from '@/utils/authUtils';
import Button from '@/components/common/button/button';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
        <div className={styles.logo}>
            <img src="/FOURTEEN.Logo.POSITIEF_Green_RGB_v1.png" alt="Logo" style={{ width: '200px', height: 'auto'}}/>
        </div>
      <ul className={styles.navList}>
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/dashboard/items">
            Items
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout} href={"/"}>Logout</Link>
          {/* <button className={styles.button} onClick={handleLogout}>Logout</button>  */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
