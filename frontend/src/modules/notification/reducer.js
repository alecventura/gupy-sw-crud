const init = {
  notification: {},
};

const notification = (state = init, action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return {
        ...state,
        notification: {
          success: action.success,
          message: action.message,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default notification;
