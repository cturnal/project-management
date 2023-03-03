import { useContext, createContext, useReducer, useEffect } from 'react';

const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, {
    project: null,
    projects: null,
  });

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
