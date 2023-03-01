import { Box, Button, Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import useToggle from '../../hooks/useToggle';

const SidebarWrapper = ({ children }) => {
  const { isToggle, toggle } = useToggle();
  return (
    <>
      <Flex as='aside'>
        <Box
          height='full'
          width='220px'
          position={{ base: 'fixed', md: 'static' }}
          left={
            (!isToggle ? { base: '-300px' } : { base: 0 }) ||
            (isToggle ? { base: 0 } : { base: '-300px' })
          }
          zIndex='3'
          transition='ease 0.2s'
          boxShadow='lg'
        >
          {children}
        </Box>
        <Button
          onClick={toggle}
          position={{ base: 'fixed', md: 'static' }}
          display={{ base: 'block', md: 'none' }}
          left={
            (isToggle ? { base: '225px' } : { base: '5px' }) ||
            (!isToggle ? { base: '5px' } : { base: '-300px' })
          }
          top='50px'
          boxShadow='lg'
          colorScheme='facebook'
          transition='ease 0.2s'
          zIndex='3'
        >
          {isToggle ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </Button>
      </Flex>
    </>
  );
};

export default SidebarWrapper;
