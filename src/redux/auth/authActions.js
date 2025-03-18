import { signOut } from "firebase/auth";
import { logOutUser, setLoading, setUser } from "./authSlice";
import auth from "@/firebase/firebase.config";

export const logOut = async (dispatch) => {
  dispatch(setLoading(true));
  await signOut(auth);
  dispatch(logOutUser());
};
