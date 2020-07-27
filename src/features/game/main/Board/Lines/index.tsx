import React from 'react';
import { BoardRows, CoinSize, BoardColumns, BoardHeight, BoardWidth } from '../../../config';
import styles from './Lines.module.css';


export const Lines: React.FC = () => {
  const lines = []

  // Creat Horizontal lines
  for (let i = 1; i < BoardRows; i++) {
    const width = BoardWidth;
    lines.push(<svg key={`rowLine${i}`} viewBox={`0 0 ${width} 2`} style={{ top: `${i * CoinSize}px`, position: "absolute", left: "0px" }}>
      <line x1="0" y1="0" x2={`${width}`} y2="0" className={styles.dotted} stroke="white" />
    </svg>)
  }

  // Create Vertical lines
  for (let i = 1; i < BoardColumns; i++) {
    const height = BoardHeight;
    lines.push(<svg key={`colLine${i}`} viewBox={`0 0 2 ${height}`} style={{ left: `${i * CoinSize}px`, position: "absolute", top: "0px", height }}>
      <line x1="0" y1="0" x2="0" y2={`${height}`} className={styles.dotted} stroke="white" />
    </svg>)
  }


  return (
    <>
      {lines}
    </>
  );
}
