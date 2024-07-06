import React from 'react';

import './Snake.css';

import { useInterval } from '../hooks/useInterval';

export const SNAKE_SPEED = 2;

export const Snake = React.memo(({ inputDirection }) => {
  console.log('Draw snake');
  const [body, setBody] = React.useState([
    { x: 11, y: 11 },
  ]);

  const updateBody = () => {
    const updatedBody = body.slice();
    for (let i = updatedBody.length - 2; i >= 0; i--) {
      updatedBody[i + 1] = { ...updatedBody[i] };
    }

    updatedBody[0].x += inputDirection.x;
    updatedBody[0].y += inputDirection.y;

    setBody(updatedBody);
  };

  useInterval(updateBody, 1000 / SNAKE_SPEED);

  return body.map(({ x, y }) => {
    return (
      <div
        key={`${x}-${y}`}
        className="snake"
        style={{ gridRowStart: y, gridColumnStart: x }}
      />
    );
  });
});
