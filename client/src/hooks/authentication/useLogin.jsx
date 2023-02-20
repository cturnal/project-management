import axios from 'axios';
import { useState } from 'react';
import { loginUser } from '../../api/auth';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return { login, loading, error };
};
