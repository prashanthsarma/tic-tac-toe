import React from 'react';
import styles from './CentrePageLayout.module.css';

interface ICentrePageLayoutProps{
  isCustomCursor?: boolean
}

export const CentrePageLayout:React.FC<ICentrePageLayoutProps> = (props) => {

  return (
    <div className={`${styles.fullPage} ${props.isCustomCursor ? styles.customCursor : ''}`}>
      <div className={styles.centrePage}>
        {props.children}
      </div>
    </div>
  );
}
