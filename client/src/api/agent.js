import axios from 'axios';

export const getAgents = async (value) => {
  const url = `api/users/${value}`;
  const { data } = await axios.get(url);
  return data.documents;
};
