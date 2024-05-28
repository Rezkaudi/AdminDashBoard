// utils/useAuth.js
import useToken  from './useToken'; // Adjust the import path

const useAuth = () => {
  const { token, saveToken, removeToken } = useToken(); // Assuming useToken manages token operations

  const login = (newToken) => {
    saveToken(newToken);
  };

  const logout = () => {
    removeToken();
  };

  return {
    isLoggedIn:!!token,
    login,
    logout,
  };
};

export default useAuth;