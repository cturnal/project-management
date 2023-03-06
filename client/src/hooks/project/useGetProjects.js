import { useEffect, useState } from 'react';
import { getProjects } from '../../api/project';
import { useProject } from '../../context/ProjectContext';

const useGetProjects = (value) => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useProject();
  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getProjects(value)
        .then((projects) => {
          dispatch({
            type: 'GET_PROJECTS',
            payload: projects,
          });
        })
        .catch((err) => {
          if (err) console.log(err.message);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
  return { loading };
};

export default useGetProjects;
