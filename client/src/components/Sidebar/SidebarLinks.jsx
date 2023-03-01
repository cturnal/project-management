import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Box,
  Badge,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';
import { CalendarIcon, EditIcon, AtSignIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const dashboardLinks = [
  {
    url: '/',
    icon: CalendarIcon,
    name: 'Dashboard',
  },
  {
    url: '/overview',
    icon: CalendarIcon,
    name: 'Overview',
  },

  {
    url: '/projects',
    icon: EditIcon,
    name: 'Projects',
  },
  {
    url: '/agents',
    icon: AtSignIcon,
    name: 'Agents',
  },
  {
    url: '/profile',
    icon: AtSignIcon,
    name: 'Profile',
  },
];

const SidebarLinks = () => {
  const { user } = useAuth();
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      h='100%'
      pt='20'
      bg='#3b5998'
      color='white'
    >
      <Flex
        flexDirection='column'
        mb='10'
        alignItems='center'
        textAlign='center'
      >
        <Box>
          <Text fontWeight='bold' letterSpacing={1}>
            {user.name}
          </Text>
          <Badge
            colorScheme='blue'
            rounded={5}
            shadow='lg'
            fontWeight='bold'
            letterSpacing={1}
          >
            {user.role}
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
              ml={{ base: '40px', md: '70px' }}
              width='180px'
              p='12px'
              roundedLeft={10}
              display='block'
              _activeLink={{
                bg: 'gray.100',
                color: 'black',
                zIndex: '4',
              }}
              _hover={{
                bg: 'gray.100',
                color: 'black',
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
