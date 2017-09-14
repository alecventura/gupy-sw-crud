import { connect } from 'react-redux';
import component from './component';
import { handleSubmit } from './action';

const mapDispatchToProps = ({ handleSubmit });

export default connect(() => { return {} }, mapDispatchToProps)(component);
