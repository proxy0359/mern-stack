import React, { createContext, useCallback, useState } from 'react';

export const userContext = createContext({
  id: '',
  setUserId: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  const getUserId = (id) => {
    setUserId(id);
  };

  const value = { id: userId, setUserId: getUserId };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
