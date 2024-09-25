"use server"
import { cookies } from 'next/headers'

export const getAuthStatus = () => {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn  = cookies().get("authToken");


  return !!isLoggedIn;
};
