import React from 'react';
import style from './style.scss';
import { withRouter, Link, Route } from 'react-router-dom';
import FillDatabaseButton from '../fillDatabaseButton/container';

const Button = (props) => {
  return (
    <Route render={({ history }) => (
      <button type='button' onClick={() => { 
        history.push(props.location) 
        }}>
        {props.text}
      </button>
    )} />
  )
}

export default () => (
  <div className="homeContainer">
    <FillDatabaseButton />
    <div className="buttonsContainer">
      <Button location='/films' text='Films' />
      <Button location='/people' text='People' />
      <Button location='/planets' text='Planets' />
      <Button location='/species' text='Species' />
      <Button location='/starships' text='Starships' />
      <Button location='/vehicles' text='Vehicles' />
    </div>
  </div>
);
