import { Flex, Spacer } from '@chakra-ui/react';

import NavLinks from './NavLinks';
import NavMenu from './NavMenu';
import NavLogo from './NavLogo';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Flex
      as='nav'
      alignItems='center'
      p={{ base: '2', sm: '4' }}
      mx={2}
      mb='85px'
    >
      <NavLogo />
      <Spacer />
      {isLoggedIn ? <NavMenu /> : <NavLinks />}
    </Flex>
  );
};

export default Navbar;
