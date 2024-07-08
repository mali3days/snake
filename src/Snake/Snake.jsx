import React from 'react';

import './Snake.css';

import { useInterval } from '../hooks/useInterval';
import { equalPositions } from '../utils/equalPositions';

export const SNAKE_SPEED = 5;

function isOutOfBounds(x, y) {
  if (x < 1 || x > 21 || y < 1 || y > 21) return true;
  return false;
}

export const Snake = ({ body, setBody, isGameOver, setIsGameOver, inputDirection }) => {
  const updateBody = () => {
    if (isGameOver) return;

    const updatedBody = body.slice();
    for (let i = updatedBody.length - 2; i >= 0; i--) {
      updatedBody[i + 1] = { ...updatedBody[i] };
    }

    updatedBody[0] = {
      x: updatedBody[0].x + inputDirection.x,
      y: updatedBody[0].y + inputDirection.y,
    };

    const isSnakeDead = Snake.checkDeath(updatedBody[0]);

    if (isSnakeDead) {
      return setIsGameOver(true);
    } else {
      setBody(updatedBody);
    }
  };

  useInterval(updateBody, 1000 / SNAKE_SPEED);

  return body.map(({ x, y }, index) => {
    return (
      <div
        key={index}
        className="snake"
        style={{ gridRowStart: y, gridColumnStart: x }}
      />
    );
  });
};

Snake.isOnSnake = (snakeBody, foodBody) => {
  return snakeBody.some((segment) => {
    console.log("SB: ", snakeBody)
    console.log("segment: ", segment)
    return equalPositions(segment, foodBody);
  });
};

Snake.expandSnake = (amount, snakeBody) => {
  for (let i = 0; i < amount; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  return snakeBody;
};

Snake.checkDeath = ({ x, y }) => {
  return isOutOfBounds(x, y);
};

Snake.isIntersected = (snakeBody) => {
  if (snakeBody.length < 4) return false;

  return Snake.isOnSnake(snakeBody.slice(1), snakeBody[0]);
};
