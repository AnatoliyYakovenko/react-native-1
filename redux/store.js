import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// import { configureStore } from "@reduxjs/toolkit";
// import { authSlice } from "./auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//   },
// });
