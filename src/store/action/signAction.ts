import { login } from "../../services/Public";
import * as Action from "../actionTypes";
import { saveState, store } from "../store";

export const loginSuccess = (token) => ({
  type: Action.LOGIN_SUCCESS,
  payload: token,
});

const loginError = () => ({
  type: Action.LOGIN_ERROR,
});

export const loginAction = (email, password, success, fail) => (dispatch) => {
  login(email, password)
    .then((response) => {
      dispatch(loginSuccess(response.data.token));
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: Action.LOGOUT,
  });
  saveState(store.getState());
};
