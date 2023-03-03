import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navbar/MainNavigation';

const Home = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Home;
