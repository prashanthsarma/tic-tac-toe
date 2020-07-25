import React, { useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

} from '../gameSlice';
import styles from './Counter.module.css';
import {ReactComponent as  Coinx} from './../../../resources/svgs/coinx.svg'

interface ICoinProps {
  i: number;
  j: number;
  player: number;
}

export const coinMap: {[key in number]: ReactElement} = {
  0: <Coinx/>
}


export const Coin: React.FC<ICoinProps> = (props) => {

  return (
  <div>
    {coinMap[props.player]}
  </div>
  );
}
