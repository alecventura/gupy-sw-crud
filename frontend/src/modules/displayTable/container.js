import { connect } from 'react-redux';
import component from './component';
import { dataLoadFunction } from './action';

const mapStateToProps = (state, ownProps) => {
  const myState = state[ownProps.namespace].displayTable;
  return (myState);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dataLoadFunction: myParam => dispatch(dataLoadFunction(ownProps.namespace, myParam)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
