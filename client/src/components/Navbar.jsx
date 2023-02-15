import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Container,
  Stack,
  AvatarBadge,
  Avatar,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegLightbulb, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navLinks = [
  {
    url: '/login',
    name: 'Log in',
    icon: <FaSignInAlt />,
  },
  {
    url: '/signup',
    name: 'Sign up',
    icon: <FaUserPlus />,
  },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const user = true;
  return (
    <Flex as='nav' alignItems='center' p='2' mx='6' mb='20'>
      <Box>
        <Link to='/dashboard'>
          <Heading size='lg'>
            <Flex>
              PR <FaRegLightbulb />
              JECT
              <Heading as='span' color='#3b5998' size='lg'>
                MGMT
              </Heading>
            </Flex>
          </Heading>
        </Link>
      </Box>
      <Spacer />

      {user ? (
        <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
      ) : (
        <>
          <Box display={{ base: 'block', sm: 'none' }} onClick={handleClick}>
            <Button size='sm'>
              {show ? <CloseIcon /> : <HamburgerIcon />}
            </Button>
          </Box>
          <Box
            display={show ? 'block' : { base: 'none', sm: 'block' }}
            position={show ? 'relative' : 'static'}
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
                    {navLink.icon}
                    {navLink.name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
