import { connect } from 'react-redux';
import component from './component';
import { dataLoadFunction } from './action';

const mapStateToProps = (state, ownProps) => {
  console.log('ALL STATES', state);
  console.log('mapStateToProps', state[ownProps.entity]);
  console.log('ownProps.entity', ownProps.entity);
  return ({
    ...state[ownProps.entity].displayTable,
  });
};

const mapDispatchToProps = ({
  dataLoadFunction,
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
