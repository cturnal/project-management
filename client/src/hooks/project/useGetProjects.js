import { useEffect, useState } from 'react';
import { getProjects } from '../../api/project';
import { useProject } from '../../context/ProjectContext';

const useGetProjects = (value) => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useProject();

  useEffect(() => {
    let isMounted = true;
    getProjects(value)
      .then((projects) => {
        if (isMounted) {
          dispatch({
            type: 'GET_PROJECTS',
            payload: projects,
          });
          console.log(projects);
        }
      })
      .catch((err) => {
        if (err) console.log(err.message);
      })
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  return { loading };
};

export default useGetProjects;
