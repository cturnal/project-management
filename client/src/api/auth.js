import axios from 'axios';

export const loginUser = async (email, password) => {
  const url = 'http://localhost:4000/api/users/login';

  const { data } = await axios.post(url, {
    email: email,
    password: password,
  });
  return data;
};

export const logoutUser = async () => {
  const url = 'http://localhost:4000/api/users/logout';
  await axios.get(url);
};

export const signupUser = async (
  name,
  email,
  password,
  passwordConfirm,
  role
) => {
  const url = 'http://localhost:4000/api/users/signup';

  const { data } = await axios.post(url, {
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  return data;
};
