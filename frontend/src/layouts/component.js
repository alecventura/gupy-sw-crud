import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const defaultProps = {
  main: {}
};

const propTypes = {
  children: PropTypes.element.isRequired,
  main: PropTypes.shape({})
};

const MainLayout = ({ children, main }) => (
    <div>
        {children}
    </div>
);

MainLayout.defaultProps = defaultProps;
MainLayout.propTypes = propTypes;

export default MainLayout;