import React from 'react';
import cl from './Spinner.module.css';

const Spinner: React.FC = () => {
  return (
    <div className={cl.spinner_container}>
      <div className={cl.spinner}></div>
    </div>
  );
}

export default Spinner;
