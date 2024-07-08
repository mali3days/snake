import React, { useEffect } from 'react';

import { Snake } from '../Snake/Snake';
import { Food } from '../Food/Food';
import { useInputDirection } from '../hooks/useInputDirection';

import './Game.css';
import { DEFAULT_INPUT_DIRECTION } from '../hooks/useInputDirection';

const DEFAULT_SNAKE_BODY = [{ x: 11, y: 11 }];

function getDefaultSnakeBody() {
  return DEFAULT_SNAKE_BODY.map((segment) => ({ x: segment.x, y: segment.y }));
}

export const Game = () => {
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [snakeBody, setSnakeBody] = React.useState(getDefaultSnakeBody());
  const [foodBody, setFoodBody] = React.useState(
    Food.getNewFoodPosition(snakeBody)
  );
  const [inputDirection, setInputDirection] = React.useState(
    DEFAULT_INPUT_DIRECTION
  );
  useInputDirection(setInputDirection);

  const isSnakeOnFood = Snake.isOnSnake(snakeBody, foodBody);
  const isSnakeIntersected = Snake.isIntersected(snakeBody);

  useEffect(() => {
    if (isSnakeOnFood) {
      const newSnakeBody = Snake.expandSnake(
        Food.EXPANSION_RATE,
        structuredClone(snakeBody)
      );

      setSnakeBody(newSnakeBody);
      setFoodBody(Food.getNewFoodPosition(newSnakeBody));
    }
  }, [isSnakeOnFood, snakeBody]);

  useEffect(() => {
    if (isGameOver || isSnakeIntersected) {
      alert('Game over');
      setSnakeBody(getDefaultSnakeBody());
      setFoodBody(Food.getNewFoodPosition(getDefaultSnakeBody()));
      setInputDirection(DEFAULT_INPUT_DIRECTION);
      setIsGameOver(false);
    }
  }, [isGameOver, isSnakeIntersected, snakeBody]);

  return (
    <div id="board">
      <Snake
        body={snakeBody}
        setBody={setSnakeBody}
        isGameOver={isGameOver}
        inputDirection={inputDirection}
        setIsGameOver={setIsGameOver}
      />
      <Food x={foodBody.x} y={foodBody.y} />
    </div>
  );
};
