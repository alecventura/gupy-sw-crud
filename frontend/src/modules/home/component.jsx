import React from 'react';
import style from './style.scss';
import { withRouter, Link, Route } from 'react-router-dom';
import FillDatabaseButton from '../fillDatabaseButton/container';
import Button from '../linkButton/component';

export default () => (
  <div className="homeContainer">
    <FillDatabaseButton />
    <div className="buttonsContainer">
      <Button location='/films' text='Films' className='homeLinkButton' />
      <Button location='/people' text='People' className='homeLinkButton' />
      <Button location='/planets' text='Planets' className='homeLinkButton' />
      <Button location='/species' text='Species' className='homeLinkButton' />
      <Button location='/starships' text='Starships' className='homeLinkButton' />
      <Button location='/vehicles' text='Vehicles' className='homeLinkButton' />
    </div>
  </div>
);
