import { createContext, useCallback, useState } from 'react';

export const authContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const value = { isLoggedIn, logout, login };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};
