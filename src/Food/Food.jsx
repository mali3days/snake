import React from 'react';

import './Food.css';
import { Snake } from '../Snake/Snake';
import { randomIntFromInterval } from '../utils/randomIntFromInterval';

export const Food = ({ x, y }) => {
  return (
    <div className="food" style={{ gridRowStart: y, gridColumnStart: x }} />
  );
};

Food.EXPANSION_RATE = 1;

Food.getNewFoodPosition = (snakeBody) => {
  let newFoodPosition = null;

  while (
    newFoodPosition === null ||
    Snake.isOnSnake(snakeBody, newFoodPosition)
  ) {
    newFoodPosition = {
      x: randomIntFromInterval(1, 21),
      y: randomIntFromInterval(1, 21),
    };
  }

  return newFoodPosition;
};
