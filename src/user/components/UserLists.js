import React from 'react';
import style from './UserLists.module.css';
import UserItem from './UserItem';

const UserLists = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found. </h2>
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
          placeCount={item.places}
        />
      ))}
    </ul>
  );
};

export default UserLists;
