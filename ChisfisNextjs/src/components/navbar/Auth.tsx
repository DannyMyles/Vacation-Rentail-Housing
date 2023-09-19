import React, { useCallback, useState } from "react";
import styles from "../Styles/NavbarButton.module.css";

const Usermenu = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className={styles.button}>
          <p className="sm:text-sm whitespace-nowrap">Create an Account</p>
        </div>
        <div>
          <button className="px-5 py-2 text-white bg-purple-500 rounded-full lg:text-sm bg-purple sm:text-xs whitespace-nowrap">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
