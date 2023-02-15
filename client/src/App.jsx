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
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const user = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route
        index
        element={
          !user ? <Navigate to='/login' /> : <Navigate to='/dashboard' />
        }
      />

      <Route
        path='/dashboard'
        element={user ? <Dashboard /> : <Navigate to='/login' />}
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
