import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const RootLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Flex
        bg='gray.100'
        minHeight='100vh'
        minWidth='100vw'
        position={{ base: 'relative', md: 'static' }}
      >
        {isLoggedIn ? <Sidebar /> : ''}
        <Box as='main' width='100%'>
          <Navbar />
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default RootLayout;
