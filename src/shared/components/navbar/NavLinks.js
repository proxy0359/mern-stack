import React, { useContext } from 'react';
import style from './NavLinks.module.css';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../context/auth-context';

const NavLinks = (props) => {
  const authCtx = useContext(authContext);

  return (
    <ul className={`${style['nav-links']}`}>
      {!authCtx.isLoggedIn ? (
        <>
          <li onClick={props.onClick}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              ALL USERS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              AUTHENTICATE
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li onClick={props.onClick}>
            <NavLink
              to="/u1/places"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              MY PLACES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/places/new"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              ADD PLACE
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={authCtx.logout}>
              LOGOUT
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
