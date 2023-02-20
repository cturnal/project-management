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
import Login from './pages/authentication/login';
import Signup from './pages/authentication/signup';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import Agents from './pages/Agents';
import Profile from './pages/Profile';

const user = false;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={user ? <Overview /> : <Navigate to='/login' />} />

      <Route
        path='/dashboard'
        element={user ? <Dashboard /> : <Navigate to='/login' />}
      />
      <Route
        path='/projects'
        element={user ? <Projects /> : <Navigate to='/login' />}
      />
      <Route
        path='/agents'
        element={user ? <Agents /> : <Navigate to='/login' />}
      />
      <Route
        path='/profile'
        element={user ? <Profile /> : <Navigate to='/login' />}
      />
      <Route
        path='/login'
        element={!user ? <Login /> : <Navigate to='/dashboard' />}
      />
      <Route
        path='/signup'
        element={!user ? <Signup /> : <Navigate to='/dashboard' />}
      />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
