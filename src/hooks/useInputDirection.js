import React from 'react';

export const DEFAULT_INPUT_DIRECTION = { x: 0, y: -1 };

export function useInputDirection(setInputDirection) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setInputDirection((oldInputDirection) => {
            if (oldInputDirection.y !== 0) return oldInputDirection;
            return { x: 0, y: -1 };
          });
          break;
        case 'ArrowRight':
          setInputDirection((oldInputDirection) => {
            if (oldInputDirection.x !== 0) return oldInputDirection;
            return { x: 1, y: 0 };
          });
          break;
        case 'ArrowDown':
          setInputDirection((oldInputDirection) => {
            if (oldInputDirection.y !== 0) return oldInputDirection;
            return { x: 0, y: 1 };
          });
          break;
        case 'ArrowLeft':
          setInputDirection((oldInputDirection) => {
            if (oldInputDirection.x !== 0) return oldInputDirection;
            return { x: -1, y: 0 };
          });
          break;
        default:
          setInputDirection(DEFAULT_INPUT_DIRECTION);
      }
    });
  }, [setInputDirection]);
}
