import axios from "axios";
import jwtDecode from "jwt-decode";
import ActionCreators from "../actionCreators";
import { put } from "redux-saga/effects";
export function* login(action) {
  // console.log("login", action);
  let token = localStorage.getItem("token");
  // if (!token) {
  const login = yield axios.post("http://localhost:3001/users/login", {
    email: action.email,
    passwd: action.passwd,
  });
  if (login.data.token) {
    token = login.data.token;
    localStorage.setItem("token", token);

    const user = jwtDecode(token);
    localStorage.setItem("user", user);
    yield put(ActionCreators.signinSuccess(user));
  } else {
    yield put(ActionCreators.signinFailure(login.data.message));
  }
}
export function* updateProfile(action) {
  const token = localStorage.getItem("token");
  const userToSave = {
    ...action.user,
  };

  yield axios.patch(
    `http://localhost:3001/users/${action.user.id}`,
    userToSave,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  yield put(ActionCreators.updateProfileSuccess(userToSave));
}
export function* createProfile(action) {
  const userToSave = {
    ...action.user,
  };

  const user = yield axios.post(`http://localhost:3001/users/`, userToSave);
  if (user && user.data && user.data.error) {
    yield put(ActionCreators.createProfileFailure(user.data.message));
  } else {
    yield put(ActionCreators.signinSuccess(userToSave));
    yield put(
      ActionCreators.createProfileSuccess(userToSave.email, userToSave.passwd)
    );
  }
}
export function* destroyAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  yield put(ActionCreators.destroyAuthSuccess());
}
export function* auth() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      // const user = jwtDecode(token);
      const user = yield axios.get("http://localhost:3001/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      yield put(ActionCreators.authSuccess(user.data));
    } catch (e) {
      yield put(ActionCreators.authFailure("invalid token"));
    }
  } else {
    yield put(ActionCreators.authFailure("no token"));
  }
  // console.log("auth");
}
