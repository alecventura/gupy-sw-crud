import { connect } from 'react-redux';
import component from './component';

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps, {})(component);
