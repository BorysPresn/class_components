import { Component } from 'react';
import cl from './Spinner.module.css';

class Spinner extends Component {
  render() {
    return (
      <div className={cl.spinner_container}>
        <div className={cl.spinner}></div>
      </div>
    );
  }
}

export default Spinner;
