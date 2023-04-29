import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpReq = useRef([]);
  const sendRequest = useCallback(async (url, method, body = {}) => {
    setIsLoading(true);
    const abortCtrl = new AbortController();
    activeHttpReq.current.push(abortCtrl);

    try {
      const response = await method(url, { ...body, signal: abortCtrl.signal });
      return await response.data;
    } catch (err) {
      setError(err.response.data.message);
    }
    isLoading(false);
  }, []);

  const errorReset = () => {
    setError(null);
  };

  useEffect(() => {
    return () =>
      activeHttpReq.current.forEach((abortCtrl) => abortCtrl.abort());
  }, []);

  return { isLoading, error, sendRequest, errorReset };
};
