import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

} from '../gameSlice';
import styles from './Counter.module.css';

export const Coin = (i: number, j: number, p: number) => {
  return (
    <div>
      {p}
    </div>
  );
}
