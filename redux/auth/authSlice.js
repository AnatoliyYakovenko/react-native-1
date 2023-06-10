// import { createSlice } from "@reduxjs/toolkit";
// import Toast from "react-native-toast-message";
// import {
//   authSignUpUser,
//   authSignInUser,
//   authSingOutUser,
// } from "./authOperations";

// const initialState = {
//   userId: null,
//   login: null,
//   stateChange: false,
//   email: null,
//   avatar: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     authStateChanged: (state, { payload }) => ({
//       ...state,
//       userId: payload.userId,
//       login: payload.login,
//       email: payload.email,
//       stateChange: true,
//       avatar: payload.avatar,
//     }),
//   },
//   extraReducers: (builder) =>
//     builder
//       .addCase(authSignUpUser.fulfilled, (state, action) => {
//         state.userId = action.payload.uid;
//         state.login = action.payload.displayName;
//         state.email = action.payload.email;
//         state.avatar = action.payload.photoURL;
//       })
//       .addCase(authSignUpUser.rejected, (state, action) => {
//         console.log(state);
//         console.log(action);
//         Toast.show({ type: "error", text1: "Wrong email" });
//       })
//       .addCase(authSignInUser.fulfilled, () => {
//         Toast.show({ type: "success", text1: `Welcome` });
//       })
//       .addCase(authSignInUser.rejected, () => {
//         Toast.show({ type: "error", text1: "Wrong email or password" });
//       })
//       .addCase(authSingOutUser.fulfilled, (state) => {
//         state.userId = null;
//         state.login = null;
//         state.stateChange = false;
//         state.email = null;
//         state.avatar = null;
//       }),
// });

// export const authReducer = authSlice.reducer;
// export const onStateChange = authSlice.actions.authStateChanged;

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      stateChange: true,
    }),
  },
});
export const onStateChange = authSlice.actions.updateUserProfile;
