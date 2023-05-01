import React, { useContext, useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import { getUserPlace } from '../../api/getUserPlaces';

import { userContext } from '../../shared/context/user-context';

const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const userId = useContext(userContext).id;

  useEffect(() => {
    const getPlaces = async () => {
      const response = await getUserPlace(userId);

      setUserPlaces(response);
    };
    getPlaces();
  }, [setUserPlaces, userId, userPlaces]);

  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
