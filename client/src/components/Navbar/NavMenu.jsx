import {
  Menu,
  MenuButton,
  Avatar,
  AvatarBadge,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { CgLogOut, CgProfile } from 'react-icons/cg';
import { useLogout } from '../../hooks/authentication/useLogout';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavMenu = () => {
  const { logout } = useLogout();
  const { user } = useAuth();
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
            src={'/images/users/' + user.photo}
            name={user.name}
          >
            <AvatarBadge boxSize='1em' bg='green.500' />
          </Avatar>
        </MenuButton>

        <MenuList
          my='0'
          py='0'
          mx={2}
          minW
          border='none'
          bg='transparent'
          shadow='none'
        >
          <Link to='/profile'>
            <MenuItem my={1} bg='#3b5998' color='white' rounded={10} gap={2}>
              <Icon as={CgProfile} />
              Profile
            </MenuItem>
          </Link>
          <MenuItem
            my={1}
            bg='#3b5998'
            color='white'
            rounded={10}
            gap={1}
            onClick={() => logout()}
          >
            <Icon as={CgLogOut} />
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NavMenu;
