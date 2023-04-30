import React, { useState } from 'react';
import style from './MainNavigation.module.css';
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';

const MainNavigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const drawerHandler = () => {
    setShowDrawer((drawer) => !drawer);
  };

  return (
    <>
      {showDrawer ? (
        <>
          <Backdrop onClick={drawerHandler} />
        </>
      ) : null}
      <SideDrawer show={showDrawer}>
        <nav className={style['main-navigation__drawer-naV']}>
          <NavLinks onClick={drawerHandler} />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={`${style['main-navigation__menu-btn']}`}
          onClick={drawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={`${style['main-navigation__title']}`}>
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className={style['main-navigation__header-nav']}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
