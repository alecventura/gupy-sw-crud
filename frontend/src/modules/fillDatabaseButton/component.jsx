import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const defaultProps = {
  handleSubmit: () => {},
};

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};


class FillDatabaseButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  render() {
    return (
      <button type='button' className="fillDatabase" onClick={this.handleSubmit}>
        Fill Database
      </button>
    );
  }
}

FillDatabaseButton.defaultProps = defaultProps;
FillDatabaseButton.propTypes = propTypes;

export default FillDatabaseButton;
