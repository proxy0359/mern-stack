import React, { useEffect, useState } from 'react';
import UserLists from '../components/UserLists';
import { getUser } from '../../api/getUser';
import Spinner from '../../shared/components/loading/Spinner';

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

  return users ? <UserLists items={users} /> : <Spinner />;
};

export default Users;
