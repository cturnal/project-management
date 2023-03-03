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
          position={{ base: 'fixed', md: 'static' }}
          left={
            (!isToggle ? { base: '-300px' } : { base: 0 }) ||
            (isToggle ? { base: 0 } : { base: '-300px' })
          }
          zIndex='3'
          transition='ease 0.2s'
        >
          {children}
        </Box>
        <Button
          onClick={toggle}
          display={{ base: 'block', md: 'none' }}
          position={{ base: 'fixed', md: 'static' }}
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
      <Box
        height='full'
        width={isToggle ? { base: '100%', md: 0 } : { base: 0 }}
        position='absolute'
        bg='black'
        opacity='10%'
        zIndex='2'
      />
    </>
  );
};

export default SidebarWrapper;
