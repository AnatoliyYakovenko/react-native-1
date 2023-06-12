import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRoute from "../router";

import { authStateChangeUser } from "../redux/auth/authOperations";

export default function Home() {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return routing;
}
