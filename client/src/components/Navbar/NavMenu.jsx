import {
  Menu,
  MenuButton,
  Avatar,
  AvatarBadge,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const NavMenu = () => {
  return (
    <>
      <Menu minW>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon fontSize='20' />}
          size='xl'
          colorScheme='none'
          color='black'
        >
          <Avatar
            size='sm'
            name='Dan Abrahmov'
            src='https://bit.ly/dan-abramov'
            shadow='dark-lg'
          >
            <AvatarBadge boxSize='1em' bg='green.500' />
          </Avatar>
        </MenuButton>

        <MenuList mt='2' shadow='md' minW>
          <MenuItem>My Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NavMenu;
