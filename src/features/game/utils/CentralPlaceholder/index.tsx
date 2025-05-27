import React, { PropsWithChildren } from 'react';
import styles from './CentralPlaceholder.module.css';
import { BoardHeight, BoardWidth } from '../../config';

export const CentralPlaceholder: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.outerBorder}>
      <div className={styles.innerBox} style={{ height: `${BoardHeight}px`, width: `${BoardWidth}px` }}>
        {children}
      </div>
    </div>
  );
};
