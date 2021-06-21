import React, { useState } from 'react';

type ButtonProps = {
  text?: number;
}
export const Button = (props: ButtonProps) => {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button onClick={increment}>{counter}</button>
  );
}