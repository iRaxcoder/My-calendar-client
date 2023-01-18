import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onCheckingAuth,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ loginEmail, loginPassword }) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await calendarApi.post("/auth/", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token-calendar", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (err) {
      dispatch(onLogout("Incorrect credentials"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, registerEmail, registerPassword }) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email: registerEmail,
        password: registerPassword,
      });
      localStorage.setItem("token-calendar", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name, uid: data.uid }));
    } catch (err) {
      dispatch(onLogout(err.response.data?.msg || "Error ocurred"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token-calendar");
    console.log(token);
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token-calendar", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (err) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    errorMessage,
    status,
    user,

    //methods

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
