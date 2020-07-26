import React, { useState, ReactElement } from 'react';
import styles from './CentralPlaceholder.module.css';


export const CentralPlaceholder: React.FC = (props) => {

  return (
    <div className={styles.outerBorder}>
      <div className={styles.innerBox}>
        {props.children}
      </div>
    </div>
  );
}
