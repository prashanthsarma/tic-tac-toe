import React from 'react';
import { useSelector } from 'react-redux';
import { selectGameConfig } from '../../../gameSlice';
import styles from './Lines.module.css';


export const Lines: React.FC = () => {
  const config = useSelector(selectGameConfig);
  const lines = [];

  // Create Horizontal lines
  for (let i = 1; i < config.boardRows; i++) {
    const width = config.coinSize * config.boardColumns;
    lines.push(
      <svg key={`rowLine${i}`} viewBox={`0 0 ${width} 2`} style={{ top: `${i * config.coinSize}px`, position: "absolute", left: "0px" }}>
        <line x1="0" y1="0" x2={`${width}`} y2="0" className={styles.dotted} stroke="white" />
      </svg>
    );
  }

  // Create Vertical lines
  for (let i = 1; i < config.boardColumns; i++) {
    const height = config.coinSize * config.boardRows;
    lines.push(
      <svg key={`colLine${i}`} viewBox={`0 0 2 ${height}`} style={{ left: `${i * config.coinSize}px`, position: "absolute", top: "0px", height }}>
        <line x1="0" y1="0" x2="0" y2={`${height}`} className={styles.dotted} stroke="white" />
      </svg>
    );
  }

  return <>{lines}</>;
};
