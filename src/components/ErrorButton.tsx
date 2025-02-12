import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [ state, setState ] = useState(false)

  const handleClick = () => {
    setState(true);
  };

  if (state) {
    throw new Error('Test error');
  }

  return (
    <button className="button error-btn" onClick={handleClick}>
      Throw Error
    </button>
  );
}

export default ErrorButton;
