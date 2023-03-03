import axios from 'axios';

export const getProjects = async (value) => {
  const url = `api/projects/${value}`;
  const { data } = await axios.get(url);
  return data.documents;
};
