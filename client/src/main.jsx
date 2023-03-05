import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from './context/AuthContext';
import { ProjectContextProvider } from './context/ProjectContext';
import { AgentContextProvider } from './context/AgentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <ProjectContextProvider>
          <AgentContextProvider>
            <App />
          </AgentContextProvider>
        </ProjectContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
