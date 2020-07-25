import React, { useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

} from '../gameSlice';
import styles from './Coin.module.css';
import { ReactComponent as CoinX } from './../../../resources/svgs/coinx.svg'
import { ReactComponent as CoinO } from './../../../resources/svgs/coino.svg'

interface ICoinProps {
  i: number;
  j: number;
  player: number;
  isWin: boolean;
}

export const coinMap: { [key in number]: ReactElement } = {
  1: <CoinX />,
  2: <CoinO />
}


export const Coin: React.FC<ICoinProps> = (props) => {

  let displayCoin = coinMap[props.player]
  if (displayCoin == null && props.player > 0) {
    displayCoin = <span>{props.player}</span>
  }

  return (
    <div className={`${styles.placeholder} ${props.isWin ? styles.win : styles.normal}`}>
      {displayCoin}
    </div>
  );
}
