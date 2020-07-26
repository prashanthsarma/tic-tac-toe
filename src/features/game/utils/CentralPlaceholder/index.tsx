import React, {  } from 'react';
import styles from './CentralPlaceholder.module.css';
import { BoardHeight, BoardWidth } from '../../constants';


export const CentralPlaceholder: React.FC = (props) => {

  return (
    <div className={styles.outerBorder}>
      <div className={styles.innerBox} style={{ height: `${BoardHeight}px`, width: `${BoardWidth}px` }}>
        {props.children}
      </div>
    </div>
  );
}
