// export const authSignOutUser = () => async () => {};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch) => {
    // console.log(email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await user.updateProfile({
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    // console.log(email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { auth } from "../../firebase/config";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   signOut,
// } from "firebase/auth";

// export const authSignUpUser = createAsyncThunk(
//   "auth/signUpUser",
//   async ({ mail, password, login, avatar }, thunkApi) => {
//     try {
//       const auth = getAuth();
//       await createUserWithEmailAndPassword(auth, mail, password);
//       await updateProfile(auth.currentUser, {
//         displayName: login,
//         photoURL: avatar,
//       });
//       const { uid, displayName, email, photoURL } = auth.currentUser;
//       return { uid, displayName, email, photoURL };
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const authSignInUser = createAsyncThunk(
//   "auth/signInUser",
//   async ({ mail, password }, thunkApi) => {
//     try {
//       await signInWithEmailAndPassword(auth, mail, password);
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
