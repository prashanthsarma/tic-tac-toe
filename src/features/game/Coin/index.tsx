import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../gameSlice';
import styles from './Counter.module.css';

export const Coin = (i,j,p) => {
  return (
    <div>
    </div>
  );
}
