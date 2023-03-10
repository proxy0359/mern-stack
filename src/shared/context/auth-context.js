import { createContext, useCallback, useState } from 'react';

export const authContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const value = { isLoggedIn, logout, login };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};
