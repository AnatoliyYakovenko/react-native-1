import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, login, avatar }) =>
  async () => {
    console.log(email, password, login, avatar);
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
export const authSignInUser = () => async () => {};
export const authSignOutUser = () => async () => {};
