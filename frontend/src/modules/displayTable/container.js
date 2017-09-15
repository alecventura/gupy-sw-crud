import { connect } from 'react-redux';
import component from './component';
import { dataLoadFunction } from './action';

const mapStateToProps = (state, ownProps) => {
  // console.log('ALL STATES', state);
  const myState = state[ownProps.namespace].displayTable;
  // console.log('STATE NAMESPACE', ownProps.namespace);
  // console.log('MYSTATE', myState);
  return (myState);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dataLoadFunction: myParam => dispatch(dataLoadFunction(ownProps.namespace, myParam)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
