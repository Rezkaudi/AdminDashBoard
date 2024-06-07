"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, deleteToken } from "@/mainData/token/tokenSlice";
import { useDispatch } from "react-redux";

const useToken = () => {
  const dispatch = useDispatch();
  // const reduxToken = useSelector((state) => state.token); // Adjust the path according to your state shape

  // Function to save token to local storage and Redux store
  const saveToken = (token, rememberMe) => {
    // localStorage.setItem("authToken", token);
    // dispatch(setToken(token));

    if (rememberMe) {
      Cookies.set("authToken", token, { expires: 7 });
    } else {
      Cookies.set("authToken", token, { expires: 1 / 24 });
    }
  };

  // Function to load token from local storage
  const loadToken = () => {
    const tokenFromCooki = Cookies.get("authToken");
    // const tokenFromSessionStorage = sessionStorage.getItem("authToken");
    // const tokenFromLocalStorage = localStorage.getItem("authToken");

    return tokenFromCooki;
  };

  // Function to remove token from local storage and Redux store
  const removeToken = () => {
    dispatch(deleteToken());
    Cookies.remove("authToken");
    // sessionStorage.removeItem("authToken");
    // localStorage.removeItem("authToken");
  };

  // State to hold the current token, initializing with the loaded token
  const [token, setTokenState] = useState(loadToken());

  // Effect to update token state when component mounts or Redux token changes
  useEffect(() => {
    setTokenState(loadToken()); // Sync local state with Redux token or fallback to local storage
  }, [token]); // Depend on reduxToken to trigger updates

  return { token, saveToken, removeToken };
};
export default useToken;
