import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
} from '../gameSlice';
import styles from './Arena.module.css';
import { Board } from '../Board';

export const Arena = () => {

  return (
    <div>
     <Board/>
    </div>
  );
}
