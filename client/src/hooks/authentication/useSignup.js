import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { signupUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export const useSignup = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const signup = async (name, email, password, passwordConfirm, role) => {
    setLoading(true);
    try {
      const data = await signupUser(
        name,
        email,
        password,
        passwordConfirm,
        role
      );
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: 'SIGNUP_USER',
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
