import React from 'react';
import style from './UserLists.module.css';
import UserItem from './UserItem';
import Spinner from '../../shared/components/loading/Spinner';

const UserLists = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }
  return (
    <ul className={`${style['users-list']}`}>
      {props.items.map((item) => (
        <UserItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          placeCount={item.places.length}
        />
      ))}
    </ul>
  );
};

export default UserLists;
