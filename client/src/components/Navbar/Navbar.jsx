import { Flex, Spacer } from '@chakra-ui/react';

import NavLinks from './NavLinks';
import NavMenu from './NavMenu';
import NavLogo from './NavLogo';

const Navbar = () => {
  const user = false;

  return (
    <Flex
      as='nav'
      alignItems='center'
      p={{ base: '2', sm: '4' }}
      mx='2'
      mb='20'
    >
      <NavLogo />
      <Spacer />
      {user ? <NavMenu /> : <NavLinks />}
    </Flex>
  );
};

export default Navbar;
