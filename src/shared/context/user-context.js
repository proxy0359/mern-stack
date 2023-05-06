import React, { createContext, useCallback, useState } from 'react';

export const userContext = createContext({
  id: '',
  setUserId: () => {},
  getToken: () => {},
  token: '',
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState();

  const getUserId = (id) => {
    setUserId(id);
  };

  const getToken = (token) => {
    setToken(token);
  };

  const value = { id: userId, setUserId: getUserId, getToken, token };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
