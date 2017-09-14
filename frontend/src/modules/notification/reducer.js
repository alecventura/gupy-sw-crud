const init = {
  notification: {},
};

const notification = (state = init, action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return Object.assign({}, state, {
        notification: {
          success: action.success,
          message: action.message,
        },
      });
    }
    default: {
      return Object.assign({}, state);
    }
  }
};

export default notification;
