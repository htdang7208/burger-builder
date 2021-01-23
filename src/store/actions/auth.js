import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (localId, idToken) => {
  return { type: actionTypes.AUTH_SUCCESS, localId: localId, idToken: idToken };
};

export const authFailed = (error) => {
  return { type: actionTypes.AUTH_FAILED, error: error };
};

export const logout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  localStorage.removeItem('expiresIn');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn);
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem('idToken');

    if (!idToken) {
      dispatch(logout());
    } else {
      const expiresIn = new Date(localStorage.getItem('expiresIn'));
      const newDate = new Date();

      if (expiresIn < newDate) {
        dispatch(logout());
      } else {
        const localId = localStorage.getItem('localId');
        dispatch(authSuccess(localId, idToken));
        dispatch(checkAuthTimeout(expiresIn.getTime() - newDate.getTime()));
      }
    }
  };
};

export const auth = (email, password, type) => {
  let url =
    type === 'login'
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRtLowbWE0vAXDxFvs45Tjrsk7qq3qpS0'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRtLowbWE0vAXDxFvs45Tjrsk7qq3qpS0';
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(url, { email: email, password: password, returnSecureToken: true })
      .then((res) => {
        if (type === 'login') {
          localStorage.setItem('idToken', res.data.idToken);
          localStorage.setItem('localId', res.data.localId);
          localStorage.setItem(
            'expiresIn',
            new Date(new Date().getTime() + res.data.expiresIn * 1000)
          );
        }
        dispatch(authSuccess(res.data.localId, res.data.idToken));
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error));
      });
  };
};
