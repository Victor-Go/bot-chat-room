import { combineReducers } from "redux";
import users from "./users";
import chatRoom from "./chatRoom";

export default combineReducers({
  users,
  chatRoom
})