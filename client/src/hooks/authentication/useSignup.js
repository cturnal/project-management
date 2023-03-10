import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { signupUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export const useSignup = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const signup = async (values) => {
    setLoading(true);
    try {
      const data = await signupUser(values);
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

  return { signup, loading };
};
