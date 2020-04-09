const initialState = {
  token: null,
  status: "idle",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ACCESS_TOKEN": {
      return {
        ...state,
        status: "idle",
        token: action.token,
      };
    }
    case "RECEIVE_ACCESS_TOKEN_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
