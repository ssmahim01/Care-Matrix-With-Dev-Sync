import { signOut } from "firebase/auth";
import { logOutUser, setLoading } from "./authSlice";
import auth from "@/firebase/firebase.config";
import { useSelector } from "react-redux";

export const useAuthUser = () => {
  const user = useSelector((state) => state.auth.user);
  return user;
};

export const logOut = async (dispatch) => {
  dispatch(setLoading(true));
  await signOut(auth);
  dispatch(logOutUser());
};
