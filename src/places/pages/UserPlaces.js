import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc3NjU2NzUxNTgwODk1/this-day-in-history-05011931---empire-state-building-dedicated.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u1',
  },
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc3NjU2NzUxNTgwODk1/this-day-in-history-05011931---empire-state-building-dedicated.jpg',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const id = useParams().userId;

  const loadedPlaces = DUMMY_PLACES.filter((item) => item.creator === id);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
