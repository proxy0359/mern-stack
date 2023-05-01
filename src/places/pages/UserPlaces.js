import React, { useContext, useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { getUserPlace } from '../../api/getUserPlaces';

import { userContext } from '../../shared/context/user-context';
import { useParams } from 'react-router-dom';

const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const userId = useContext(userContext).id;
  const uId = useParams().userId;

  useEffect(() => {
    const getPlaces = async () => {
      const response = await getUserPlace(uId);
      console.log(response);

      setUserPlaces(response);
    };
    getPlaces();
  }, [setUserPlaces, userId]);

  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
