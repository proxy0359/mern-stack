import React from 'react';
import style from './NavLinks.module.css';
import { NavLink } from 'react-router-dom';

const NavLinks = (props) => {
  return (
    <ul className={`${style['nav-links']}`}>
      <li onClick={props.onClick}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          ALL USERS
        </NavLink>
      </li>
      <li onClick={props.onClick}>
        <NavLink
          to="/u1/places"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/places/new"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          ADD PLACE
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
