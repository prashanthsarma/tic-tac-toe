import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import styles from './CentralPlaceholder.module.css';
import { BoardHeight, BoardWidth } from '../../config';
import { selectGameConfig } from '../../gameSlice';

export const CentralPlaceholder: React.FC<PropsWithChildren> = ({ children }) => {
  const config = useSelector(selectGameConfig) as import('../../interfaces').GameConfig;
  return (
    <div className={styles.outerBorder}>
      <div className={styles.innerBox} style={{ height: `${BoardHeight(config)}px`, width: `${BoardWidth(config)}px` }}>
        {children}
      </div>
    </div>
  );
};
