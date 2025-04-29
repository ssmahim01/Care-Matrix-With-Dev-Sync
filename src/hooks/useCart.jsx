import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { fetchCart } from "@/redux/cartSlice";
import { useAuthUser } from "@/redux/auth/authActions";

const useCart = () => {
  const dispatch = useDispatch();
  const user = useAuthUser();
  const { items: cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchCart(user.email));
    }
  }, [user, dispatch]);

  const refetch = useCallback(() => {
    if (user?.email) {
      dispatch(fetchCart(user.email));
    }
  }, [dispatch, user]);

  return [cart, loading, refetch];
};

export default useCart;
