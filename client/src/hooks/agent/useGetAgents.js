import { useEffect, useState } from 'react';
import { getAgents } from '../../api/agent';
import { useAgent } from '../../context/AgentContext';

const useGetAgents = (value) => {
  const [loading, setLoading] = useState(true);
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
          console.log(agents);
        })
        .catch((err) => {
          if (err) console.log(err.message);
        })
        .finally(() => setLoading(false));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return { loading };
};

export default useGetAgents;
