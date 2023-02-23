import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('user', JSON.stringify(data));
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
