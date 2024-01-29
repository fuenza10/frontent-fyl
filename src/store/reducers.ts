import { combineReducers } from "redux";

import layoutReducer from "./layout/layoutSlice";

// Authentication
import AuthReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  // public
  auth:AuthReducer,
  layout: layoutReducer,
});

export default rootReducer;
