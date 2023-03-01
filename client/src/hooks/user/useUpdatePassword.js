import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { updatePassword } from '../../api/user';
import { useAuth } from '../../context/AuthContext';

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();
  const { dispatch } = useAuth();

  const update = async (values, resetForm) => {
    setLoading(true);
    try {
      const data = await updatePassword(values);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({
        type: 'LOGIN_USER',
        payload: { user: data.user },
      });
      toast({
        status: 'success',
        title: 'Password Successfully Updated',
        position: 'top',
        duration: 2000,
        variant: 'subtle',
        fontStyle: 'normal',
        containerStyle: {
          minW: '110px',
          fontSize: '12px',
        },
      });
      resetForm();
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

export default useUpdatePassword;
