import { combineReducers } from "redux";
import users from "./users";
import auth from "./auth";
import runs from "./runs";
const rootReducer = combineReducers({
  auth: auth,
  runs: runs,
  users: users,
});
export default rootReducer;
