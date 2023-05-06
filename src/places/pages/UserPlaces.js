import React, { useContext, useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { getUserPlace } from '../../api/getUserPlaces';

import { userContext } from '../../shared/context/user-context';
import { useParams } from 'react-router-dom';
import { useHttpRequest } from '../../shared/hooks/httpRequestHook';

import api from '../../api/server';

const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState();
  const userCtx = useContext(userContext);
  const uId = userCtx.id;

  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await sendRequest(
          `/api/places/user/${uId}`,
          api.get,

          {
            headers: { Authorization: `Bearer ${userCtx.token}` },
          }
        );
        console.log(response);

        setUserPlaces(response.places);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getPlaces();
  }, [setUserPlaces, uId]);

  return <PlaceList items={userPlaces ? userPlaces : false} />;
};

export default UserPlaces;
