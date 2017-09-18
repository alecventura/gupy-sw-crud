import { connect } from 'react-redux';
import component from './component';

let timer;

const notification = (success, message) => ({
  type: 'NOTIFICATION',
  success,
  message,
});

const hideNotification = () => (dispatch) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(notification(false, ''));
  }, 4000);
};

const mapStateToProps = state => ({
  ...state.notification,
});

const mapDispatchToProps = ({
  hideNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
