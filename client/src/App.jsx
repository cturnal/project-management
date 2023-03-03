import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';

// layouts
import RootLayout from './layout/RootLayout';

// pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/signup';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import Agents from './pages/Agents';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/agents' element={<Agents />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
