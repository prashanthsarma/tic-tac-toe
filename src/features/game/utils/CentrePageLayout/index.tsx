import React from 'react';
import styles from './CentrePageLayout.module.css';

export const CentrePageLayout:React.FC = (props) => {

  return (
    <div className={styles.fullPage}>
      <div className={styles.centrePage}>
        {props.children}
      </div>
    </div>
  );
}
