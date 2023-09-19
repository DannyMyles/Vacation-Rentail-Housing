import React from 'react';
import Avatar from '../../core-components/csr/atoms/avatar';

import styles from '../Styles/NavbarButton.module.css';
import Link from 'next/link';
const Usermenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          //onClick={onRent}
          className={styles.button}
        >
          <Link href="/">
            <p>Managing Listings</p>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-3 p-4 rounded-full cursor-pointer md:py-1 md:px-2">
          <div className="md:block">
            <Avatar src={'/Images/avatar21@3x.png'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
