import { Box, Button, Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import useToggle from '../../hooks/useToggle';

const SidebarWrapper = ({ children }) => {
  const { isToggle, toggle } = useToggle();
  return (
    <>
      <Flex as='aside'>
        <Box
          height='100vh'
          width='230px'
          left={isToggle ? '0' : { base: '-300px', md: '0' }}
          position={{ base: 'absolute', md: 'static' }}
          zIndex='3'
          transition='ease 0.2s'
        >
          {children}
        </Box>
        <Button
          onClick={toggle}
          position={{ base: 'absolute', md: 'static' }}
          left={isToggle ? { base: '200px' } : { base: '0' }}
          display={{ base: 'block', md: 'none' }}
          top='50px'
          boxShadow='dark-lg'
          colorScheme='facebook'
          zIndex='3'
          rounded='50'
          roundedLeft={isToggle ? '50' : 0}
        >
          {isToggle ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </Button>
      </Flex>
    </>
  );
};

export default SidebarWrapper;
