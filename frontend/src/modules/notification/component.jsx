import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const defaultProps = {
  notification: {
    success: false,
    message: ''
  },
  hideNotification: () => {}
};

const propTypes = {
  notification: PropTypes.shape({
    success: PropTypes.bool,
    message: PropTypes.string
  }),
  hideNotification: PropTypes.func.isRequired,
};

const Notification = ({ notification, hideNotification }) => {
  const { success, message } = notification;  
  let className;
  if (success && message !== '') {
    className = 'notification success';
  } else if (!success && message && message !== '') {
    className = 'notification warning';
  } else {
    className = 'notification';
  }

  if(message && message.length > 0){
    hideNotification();
  }

  return (
    <div className='notification-container'>
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