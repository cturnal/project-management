import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, Container, Flex } from '@chakra-ui/react';

const RootLayout = () => {
  return (
    <Flex bg='gray.50' minHeight='100vh' minWidth='100vw'>
      {/* <Box as='aside' bg='gray.50' minHeight='100vh' minWidth='250px'>
        <Sidebar />
      </Box> */}

      <Box as='main' width='100%'>
        <Navbar />
        <Outlet />
      </Box>
    </Flex>
  );
};

export default RootLayout;
