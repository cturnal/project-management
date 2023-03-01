import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { updateProfile } from '../../api/user';
import { useAuth } from '../../context/AuthContext';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const update = async (values) => {
    setLoading(true);
    try {
      const data = await updateProfile(values);
      localStorage.setItem('user', JSON.stringify(data?.document));
      dispatch({
        type: 'LOGIN_USER',
        payload: { user: data?.document },
      });
    } catch (error) {
      toast({
        status: 'error',
        title: error?.response?.data.message || 'Something went wrong',
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

  return { update, loading };
};
