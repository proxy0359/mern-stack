import React from 'react';
import style from './userItem.module.css';
import Avatar from '../../shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';

const UserItem = (props) => {
  return (
    <li className={`${style['user-item']}`}>
      <Card className={`${style['user-item__content']}`}>
        <Link to={`/${props.id}/places`}>
          <div className={`${style['user-item__image']}`}>
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className={`${style['user-item__info']}`}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
