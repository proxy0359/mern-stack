import React, { useContext, useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import { getUserPlace } from '../../api/getUserPlaces';

import { userContext } from '../../shared/context/user-context';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://picsum.photos/500/300?random=1',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u1',
  },
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://picsum.photos/500/300?random=1',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const userId = useContext(userContext).id;

  useEffect(() => {
    const getPlaces = async () => {
      const response = await getUserPlace(userId);

      setUserPlaces(response);
    };
    getPlaces();
  }, [setUserPlaces, userId]);

  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
