import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import style from './style.scss';
import Home from '../modules/home/component';
import Notification from '../modules/notification/container';
import DisplayTable from '../modules/displayTable/container';

const defaultProps = {
  main: {},
};

const MainLayout = () => (
  <BrowserRouter>
  <div>

    <header>
      <p>Star Wars Data into a SQL database</p>
        <nav>
          <ul>
            <li><Link to='/films'>Films</Link></li>
            <li><Link to='/people'>People</Link></li>
            <li><Link to='/planets'>Planets</Link></li>
            <li><Link to='/species'>Species</Link></li>
            <li><Link to='/starships'>Starships</Link></li>
            <li><Link to='/vehicles'>Vehicles</Link></li>
          </ul>
        </nav>
    </header>

    <Notification />

    <div className="mainContainer">
      <Route exact path="/" component={Home} />
      <Route exact path="/films" component={ () => <DisplayTable dataLoadUrl="/films" entity="films"/>} />
      <Route exact path="/people" component={ () => <DisplayTable dataLoadUrl="/people" entity="people"/>} />
      <Route exact path="/planets" component={ () => <DisplayTable dataLoadUrl="/planets" entity="planets"/>} />
      <Route exact path="/species" component={ () => <DisplayTable dataLoadUrl="/species" entity="species"/>} />
      <Route exact path="/starships" component={ () => <DisplayTable dataLoadUrl="/starships" entity="starships"/>} />
      <Route exact path="/vehicles" component={ () => <DisplayTable dataLoadUrl="/vehicles" entity="vehicles"/>} />
    </div>

    <footer className="footer">
      <p>Gupy Test - 14/09/2017</p>
      <p>Done by: <strong> Alec Ventura </strong></p>
    </footer>

  </div>
  </BrowserRouter>
);

MainLayout.defaultProps = defaultProps;

export default MainLayout;
