import axios from 'axios';

export const loginUser = async (values) => {
  const url = '/api/users/login';
  const { data } = await axios.post(url, values);
  return data;
};

export const signupUser = async (values) => {
  const url = '/api/users/signup';
  const { data } = await axios.post(url, values);
  return data;
};

export const logoutUser = async () => {
  const url = '/api/users/logout';
  await axios.get(url);
};
