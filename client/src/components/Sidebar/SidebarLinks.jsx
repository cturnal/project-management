import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Avatar,
  Box,
  Badge,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';
import { CalendarIcon, EditIcon, AtSignIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

const dashboardLinks = [
  {
    url: '/',
    icon: CalendarIcon,
    name: 'Overview',
  },

  {
    url: '/projects',
    icon: EditIcon,
    name: 'Projects',
  },
  {
    url: '/users',
    icon: AtSignIcon,
    name: 'Agents',
  },
  {
    url: '/dashboard',
    icon: CalendarIcon,
    name: 'Dashboard',
  },
  {
    url: '/profile',
    icon: AtSignIcon,
    name: 'Profile',
  },
];

const SidebarLinks = () => {
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      h='100%'
      pt='20'
      bg='#3b5998'
      color='white'
      boxShadow='dark-lg'
    >
      <Flex
        flexDirection='column'
        mb='10'
        alignItems='center'
        textAlign='center'
      >
        <Avatar src='https://bit.ly/dan-abramov' size='xl' shadow='dark-lg' />
        <Box>
          <Text fontWeight='bold'>Dan Abrahmov</Text>
          <Badge colorScheme='blue' shadow='dark-lg' rounded='50'>
            Manager
          </Badge>
        </Box>
      </Flex>

      <Divider w='150px' mb='10' />

      <List>
        {dashboardLinks.map((link) => (
          <ListItem key={link.name} p='1'>
            <Link
              as={NavLink}
              to={link.url}
              ml='90px'
              width='180px'
              p='12px'
              roundedLeft='50'
              display='block'
              _activeLink={{
                bg: 'gray.100',
                color: 'black',
                textDecoration: 'none',
                shadow: 'dark-lg',
              }}
              _hover={{
                bg: 'gray.100',
                color: 'black',
                textDecoration: 'none',
                ml: '80px',
              }}
            >
              <ListIcon as={link.icon} />
              {link.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default SidebarLinks;
