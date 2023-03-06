import { useEffect } from 'react';
import { getAgents } from '../../api/agent';
import { useAgent } from '../../context/AgentContext';

const useGetAgents = (value) => {
  const { dispatch } = useAgent();
  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getAgents(`top-5-${value}`)
        .then((agents) => {
          dispatch({
            type: `GET_${value}`,
            payload: agents,
          });
        })
        .catch((err) => {
          if (err) console.log(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
};

export default useGetAgents;
