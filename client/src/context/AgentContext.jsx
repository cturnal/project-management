import { useContext, createContext, useReducer } from 'react';

const AgentContext = createContext();

const agentReducer = (state, action) => {
  switch (action.type) {
    case 'GET_managers':
      return { ...state, managers: action.payload };
    case 'GET_developers':
      return { ...state, developers: action.payload };
    case 'GET_clients':
      return { ...state, clients: action.payload };
    default:
      return state;
  }
};

export const AgentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agentReducer, {
    managers: null,
    developers: null,
    clients: null,
  });

  return (
    <AgentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => useContext(AgentContext);
