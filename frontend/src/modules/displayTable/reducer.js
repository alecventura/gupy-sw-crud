const init = {
  displayTable: {
    data: [],
    loading: false,
    loaded: false,
  },
};

const displayTable = (state = init, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING_DATA': {
      return {
        ...state,
        displayTable: {
          ...state.displayTable,
          loading: action.loading,
        },
      };
    }
    case 'DATA_LOADED': {
      return {
        ...state,
        displayTable: {
          ...state.displayTable,
          loaded: true,
          data: action.data,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default displayTable;
