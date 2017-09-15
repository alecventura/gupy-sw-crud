import React from "react";
import PropTypes from 'prop-types';
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";

const defaultProps = {
  data: [],
  loading: false,
  loaded: false,
  dataLoadFunction: () => {},
};

const propTypes = {
  data: React.PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  dataLoadFunction: PropTypes.func,
};

class DisplayTable extends React.Component {
  constructor() {
    super();
  }

  componentDidMount(){
    if(!this.props.loaded && !this.props.loading){
      this.props.dataLoadFunction(this.props.dataLoadUrl);
    }
  }

  render() {
    const data = this.props.data;
    if(this.props.loaded){
      if(data && data.length){
        const columns = Object.keys(data[0]).map((obj) => {
          return {Header: obj, accessor: obj} 
        });
        return (
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={data.length}
              className="-striped -highlight"
            />
        );
      } else {
        return (
        <div>
          <h2> Couldnt retrieve data </h2>
        </div>
      )
      }
    } else {
      return (
        <div>
          <h2> LOADING DATA </h2>
        </div>
      )
    }
  }
}

DisplayTable.defaultProps = defaultProps;
DisplayTable.propTypes = propTypes;

export default DisplayTable;
