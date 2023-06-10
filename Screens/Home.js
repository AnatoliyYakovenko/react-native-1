import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import useRoute from "../router";
import { onAuthStateChanged } from "firebase/auth";
import { onStateChange } from "../redux/auth/authSlice";

export default function Home() {
  const { stateChange } = useSelector((state) => state.auth);
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const updateInfo = {
          userId: user.uid,
        };
        dispatch(onStateChange(updateInfo));
      }
    });
  }, []);

  const routing = useRoute(stateChange);

  return routing;
}
