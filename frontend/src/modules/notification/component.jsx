import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const defaultProps = {
  notification: {
    success: false,
    message: ''
  }
};

const propTypes = {
  notification: PropTypes.shape({
    success: PropTypes.bool,
    message: PropTypes.string
  })
};

const Notification = ({ notification }) => {
  const { success, message } = notification;
  let className;
  if (success && message !== '') {
    className = style.success;
  } else if (!success && message && message !== '') {
    className = style.warning;
  } else {
    className = style.notification;
  }

  return (
    <div className={style.notification__container}>
      <div className={className}>
        <span>
          {message}
        </span>
      </div>
    </div>
  );
};

Notification.defaultProps = defaultProps;
Notification.propTypes = propTypes;

export default Notification;