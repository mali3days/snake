import React from 'react';

import { Snake } from '../Snake/Snake';
import { useInputDirection } from '../hooks/useInputDirection';

import './Game.css';

export const Game = () => {
  const { inputDirection } = useInputDirection();

  return (
    <div id="board">
      <Snake inputDirection={inputDirection} />
    </div>
  );
};
