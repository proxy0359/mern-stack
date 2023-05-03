import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let userId;

  let activeHttpReq = useRef([]);
  const sendRequest = useCallback(async (url, method, body = {}, headers) => {
    setIsLoading(true);
    const abortCtrl = new AbortController();
    activeHttpReq.current.push(abortCtrl);

    try {
      const response = await method(
        url,
        body,

        { signal: abortCtrl.signal }
      );
      const data = await response.data;
      userId = data.user;

      activeHttpReq.current = activeHttpReq.current.filter(
        (abortController) => abortController !== abortCtrl
      );

      setIsLoading(false);

      return data.user;
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      throw err;
    }
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
