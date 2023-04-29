import React, { useEffect, useState } from 'react';
import UserLists from '../components/UserLists';
import { getUser } from '../../api/getUser';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const response = async () => {
      const data = await getUser();
      console.log(data);
      setUsers(data);
    };
    response();
  }, [setUsers]);
  const USERS = [
    {
      id: 'u1',
      name: 'Kiluwamata',
      image:
        'https://i.pinimg.com/236x/8c/06/f4/8c06f47ba352178544e2f86df6161a61--business-headshots-corporate-headshots.jpg',
      places: 3,
    },
  ];
  return <UserLists items={users} />;
};

export default Users;
