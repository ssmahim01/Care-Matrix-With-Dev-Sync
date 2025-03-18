import { onAuthStateChanged } from "firebase/auth";
import { logOutUser, setLoading, setUser } from "./authSlice";
import axios from "axios";

export const listenAuthState = (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      dispatch(setUser(currentUser));

      // Set Token in Cookies
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/jwt`,
         { email: currentUser.email },
         { withCredentials: true }
      );
    } else {
      dispatch(logOutUser());

      // Clear Token from Cookies
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
         {},
         { withCredentials: true }
      );
    }
    dispatch(setLoading(false));
  });
};
