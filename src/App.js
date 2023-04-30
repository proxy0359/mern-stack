import React, { useContext } from 'react';
import './App.css';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Users from './user/pages/Users';
import Home from './shared/page/Home';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { authContext } from './shared/context/auth-context';
import PageNotFound from './shared/page/PageNotFound';

function App() {
  const isLoggedIn = useContext(authContext).isLoggedIn;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route index element={<Users />} />
        {isLoggedIn ? (
          <Route path="/:userId/places" element={<UserPlaces />} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/places/new" element={<NewPlace />} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/places/:placeId" element={<UpdatePlace />} />
        ) : null}

        {!isLoggedIn ? <Route path="/auth" element={<Auth />} /> : null}

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
