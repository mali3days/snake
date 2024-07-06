import React from 'react';

let DEFAULT_INPUT_DIRECTION = { x: 0, y: 0 };

export function useInputDirection() {
  const [inputDirection, setInputDirection] = React.useState(
    DEFAULT_INPUT_DIRECTION
  );

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setInputDirection({ x: 0, y: -1 });
          break;
        case 'ArrowRight':
          setInputDirection({ x: 1, y: 0 });
          break;
        case 'ArrowDown':
          setInputDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setInputDirection({ x: -1, y: 0 });
          break;
        default:
          setInputDirection(DEFAULT_INPUT_DIRECTION);
      }
    });
  }, []);

  return { inputDirection };
}
