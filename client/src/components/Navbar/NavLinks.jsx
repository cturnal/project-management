import { Link } from 'react-router-dom';
import { Button, Box, Stack, Icon } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import useToggle from '../../hooks/useToggle';

const navLinks = [
  {
    url: '/login',
    name: 'Log in',
    icon: FaSignInAlt,
  },
  {
    url: '/signup',
    name: 'Sign up',
    icon: FaUserPlus,
  },
];

const NavLinks = () => {
  const { isToggle, toggle } = useToggle();
  return (
    <>
      <Button
        size='sm'
        display={{ base: 'block', sm: 'none' }}
        onClick={toggle}
      >
        {isToggle ? <CloseIcon /> : <HamburgerIcon />}
      </Button>

      <Box
        display={isToggle ? 'block' : { base: 'none', sm: 'block' }}
        position={isToggle ? 'relative' : 'static'}
      >
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          align='center'
          position={{ base: 'absolute', sm: 'static' }}
          top={{ base: '6' }}
          right={{ base: '0' }}
        >
          {navLinks.map((navLink) => (
            <Link to={navLink.url} key={navLink.name}>
              <Button colorScheme='facebook' gap='2' size='sm' w='100px'>
                <Icon as={navLink.icon} />
                {navLink.name}
              </Button>
            </Link>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default NavLinks;
