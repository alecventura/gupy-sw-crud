import { connect } from 'react-redux';
import component from './component';

const mapStateToProps = state => ({
  main: state.main
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(component);