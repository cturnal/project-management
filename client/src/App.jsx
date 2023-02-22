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
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/signup';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import Agents from './pages/Agents';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/agents' element={<Agents />} />
        <Route path='/profile' element={<Profile />} />
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
