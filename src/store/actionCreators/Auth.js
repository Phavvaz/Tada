import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupBegins = () => {
  return {
    type: actionTypes.SIGNUP_BEGINS,
  };
};

export const signupSuccess = (userId, idToken) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    userId: userId,
    idToken: idToken,
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiresIn * 1000);
  };
};

export const addUser = (details) => {
  return (dispatch) => {
    dispatch(signupBegins());
    const authData = {
      email: details.email,
      password: details.password,
      returnSecureToken: true,
    };
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUe2InsPoM8DEWjoNkV8No7sJKe9yG07I',
        authData
      )
      .then((res) => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(signupSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(signupFail(err));
      });
  };
};

export const loginBegins = () => {
  return {
    type: actionTypes.LOGIN_BEGINS,
  };
};

export const loginSuccess = (userId, idToken) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userId: userId,
    idToken: idToken,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};

export const authConfirm = (email, password) => {
  return (dispatch) => {
    dispatch(loginBegins());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUe2InsPoM8DEWjoNkV8No7sJKe9yG07I',
        authData
      )
      .then((res) => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(loginSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(loginSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
