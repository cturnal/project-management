import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const login = async (values) => {
    setLoading(true);
    try {
      const data = await loginUser(values);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));

      dispatch({
        type: 'LOGIN_USER',
        payload: data,
      });
    } catch (error) {
      toast({
        status: 'error',
        title: error.response.data.message,
        position: 'top',
        duration: 2000,
        variant: 'subtle',
        fontStyle: 'normal',
        containerStyle: {
          minW: '110px',
          fontSize: '12px',
        },
      });
    }
    setLoading(false);
  };

  return { login, loading };
};
