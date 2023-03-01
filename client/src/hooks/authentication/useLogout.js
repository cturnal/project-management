import { logoutUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({
      type: 'LOGOUT_USER',
    });
  };

  return { logout };
};
