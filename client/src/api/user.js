import axios from 'axios';

export const getProfile = async () => {
  const url = '/api/users/my-profile';
  const { data } = await axios.get(url);
  return data;
};

export const updateProfile = async (values) => {
  const url = '/api/users/update-profile';
  const { data } = await axios.patch(url, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updatePassword = async (values) => {
  const url = '/api/users/update-password';
  const { data } = await axios.patch(url, values);
  return data;
};
