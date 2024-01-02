import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actions";

const initialState = {
  registering: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, registering: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, registering: false, error: null };
    case REGISTER_FAILURE:
      return { ...state, registering: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
