import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { getProfile } from '../../api/user';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(null);
  const toast = useToast();

  const profile = async (values) => {
    setLoading(true);
    try {
      const data = await getProfile();
      localStorage.setItem('user', JSON.stringify(data.document));
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

  return { profile, loading };
};
