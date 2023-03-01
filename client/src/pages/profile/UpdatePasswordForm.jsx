import { AtSignIcon, EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
  InputRightElement,
  Select,
  Divider,
  Box,
  Avatar,
} from '@chakra-ui/react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/useForm';
import useToggle from '../hooks/useToggle';

function Profile() {
  const [values, handleChange] = useForm({});
  const { isToggle, toggle } = useToggle();

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Container p='auto' m='auto'>
      <Heading mb='8' size='md'>
        YOUR ACCOUNT SETTINGS
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex
          gap={4}
          m='auto'
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'left', sm: 'center' }}
        >
          <Avatar size='2xl' src={user.photo} alt={user.name} />

          <Input type='file' size='sm' variant='unstyled' />
        </Flex>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<InfoIcon />} bg='#3b5998' color='white' />
          <Input type='text' placeholder='Full Name' />
        </InputGroup>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<EmailIcon />} bg='#3b5998' color='white' />
          <Input type='email' placeholder='Email' />
        </InputGroup>

        <Button
          colorScheme='facebook'
          p='5'
          my='5'
          gap='2'
          fontWeight='light'
          w='100%'
        >
          <FaSignInAlt /> Update Profile
        </Button>
      </form>
      <Divider my={5} />

      <form>
        <Heading mb='8' size='md'>
          CHANGE PASSWORD
        </Heading>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='password'
            placeholder='Current Password'
            value={values.password || ''}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button h='1.75rem' size='sm' onClick={toggle}>
              {isToggle ? 'hide' : 'show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='newPassword'
            placeholder='New Password'
            value={values.newPassword || ''}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='passwordConfirm'
            placeholder='Confirm Password'
            value={values.passwordConfirm || ''}
            onChange={handleChange}
          />
        </InputGroup>

        <Button
          colorScheme='facebook'
          p='5'
          my='5'
          gap='2'
          fontWeight='light'
          w='100%'
        >
          <FaSignInAlt /> Update Password
        </Button>
      </form>
    </Container>
  );
}

export default Profile;
