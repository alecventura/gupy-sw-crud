const init = {
  displayTable: {
    data: [],
    loading: false,
    loaded: false,
  },
};

const displayTable = namespace => (state = init, action) => {
  // console.log('REDUCER STATE', state);
  switch (action.type) {
    case `${namespace}/TOGGLE_LOADING_DATA`: {
      return {
        ...state,
        displayTable: {
          ...state.displayTable,
          loading: action.loading,
        },
      };
    }
    case `${namespace}/DATA_LOADED`: {
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
