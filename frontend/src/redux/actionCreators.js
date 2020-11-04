import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  signinRequest: ["email", "passwd"],
  signinSuccess: ["user"],
  signinFailure: ["error"],

  authRequest: null,
  authSuccess: ["user"],
  authFailure: null,

  getRunsRequest: ["admin"],
  getRunsSuccess: ["runs"],
  getRunsFailure: null,

  createRunReset: null,
  createRunRequest: ["run"],
  createRunSuccess: ["run"],
  createRunFailure: ["error"],

  removeRunRequest: ["id"],
  removeRunSuccess: ["id"],
  removeRunFailure: ["error"],

  getUserRequest: ["id"],
  getUserSuccess: ["user"],
  getUserFailure: null,

  getUsersRequest: null,
  getUsersSuccess: ["users"],
  getUsersFailure: null,

  removeUserRequest: ["id"],
  removeUserSuccess: ["id"],
  removeUserFailure: ["error"],

  updateProfileReset: null,
  updateProfileRequest: ["user"],
  updateProfileSuccess: ["user"],
  updateProfileFailure: ["error"],

  updateUserReset: null,
  updateUserRequest: ["user"],
  updateUserSuccess: ["user"],
  updateUserFailure: ["error"],

  createProfileReset: null,
  createProfileRequest: ["user"],
  createProfileSuccess: ["user"],
  createProfileFailure: ["error"],

  destroyAuthRequest: null,
  destroyAuthSuccess: null,
});
export default Creators;
