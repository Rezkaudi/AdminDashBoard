"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, deleteToken } from "@/mainData/token/tokenSlice";
import { useDispatch } from "react-redux";

const useToken = () => {
  const dispatch = useDispatch();
  // const reduxToken = useSelector((state) => state.token); // Adjust the path according to your state shape

  // Function to save token to local storage and Redux store
  const saveToken = (token) => {
    // localStorage.setItem("authToken", token);
    dispatch(setToken(token));
    Cookies.set("authToken", token, { expires: 7 });
  };

  // Function to load token from local storage
  const loadToken = () => {
    // const tokenFromLocalStorage = localStorage.getItem("authToken");
    const tokenFromCooki = Cookies.get("authToken");
    return tokenFromCooki; // Prefer token from Redux if available
  };

  // Function to remove token from local storage and Redux store
  const removeToken = () => {
    // localStorage.removeItem("authToken");
    dispatch(deleteToken());
    Cookies.remove("authToken");
  };

  // State to hold the current token, initializing with the loaded token
  const [token, setTokenState] = useState(loadToken());

  // Effect to update token state when component mounts or Redux token changes
  useEffect(() => {
    setTokenState(loadToken()); // Sync local state with Redux token or fallback to local storage
  }, []); // Depend on reduxToken to trigger updates

  return { token, saveToken, removeToken };
};
export default useToken;
