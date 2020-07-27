import React from 'react';
import styles from './CentrePageLayout.module.css';

interface ICentrePageLayoutProps extends
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isCustomCursor?: boolean

}

export const CentrePageLayout: React.FC<ICentrePageLayoutProps> = (props) => {

  const { onClick } = props;
  return (
    <div className={`${styles.fullPage} ${props.isCustomCursor ? styles.customCursor : ''}`} onClick={onClick}>
      <div className={styles.centrePage}>
        {props.children}
      </div>
    </div>
  );
}
