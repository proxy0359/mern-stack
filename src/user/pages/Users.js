import React from 'react';
import UserLists from '../components/UserLists';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Kiluwamata',
      image:
        'https://i.pinimg.com/236x/8c/06/f4/8c06f47ba352178544e2f86df6161a61--business-headshots-corporate-headshots.jpg',
      places: 3,
    },
  ];
  return <UserLists items={USERS} />;
};

export default Users;
