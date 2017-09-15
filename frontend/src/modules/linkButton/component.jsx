import React from 'react';
import { Route } from 'react-router-dom';

const Button = (props) => {
  return (
    <Route render={({ history }) => (
      <button type='button' className={props.className} onClick={() => { 
        history.push(props.location) 
        }}>
        {props.text}
      </button>
    )} />
  )
}

export default Button;
