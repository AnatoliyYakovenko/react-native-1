// export const authSignOutUser = () => async () => {};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch) => {
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
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
export const authStateChangeUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
        };
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};
