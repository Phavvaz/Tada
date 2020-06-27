import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
  loading: false,
  userId: null,
  idToken: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.userId,
        idToken: action.idToken,
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.LOGIN_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.userId,
        idToken: action.idToken,
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: null,
        error: action.error,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        idToken: null,
      };

    default:
      return state;
  }
};

export default authReducer;
