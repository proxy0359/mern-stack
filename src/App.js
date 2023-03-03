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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Users />} />
      <Route path="/:id/places" element={<UserPlaces />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
