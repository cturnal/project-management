import { AtSignIcon, EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';

import {
  Container,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Heading,
  Input,
  Flex,
  Button,
  Box,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { useAuth } from '../../context/AuthContext';

function Signup() {
  const { isToggle, toggle } = useToggle();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      <Flex gap='2'>
        <Heading mb='8' size='md'>
          Signup
        </Heading>
      </Flex>
      <form>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<InfoIcon />} bg='#3b5998' color='white' />
          <Input type='text' placeholder='Full Name' />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<EmailIcon />} bg='#3b5998' color='white' />
          <Input type='email' placeholder='Email' />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input type={isToggle ? 'text' : 'password'} placeholder='password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggle}>
              {isToggle ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            placeholder='Confirm Password'
          />
        </InputGroup>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon
            children={<AtSignIcon />}
            bg='#3b5998'
            color='white'
          />
          <Select placeholder='User Role' roundedLeft='0'>
            <option value='developer'>Developer</option>
            <option value='client'>Client</option>
            <option value='manager'>Manager</option>
          </Select>
        </InputGroup>

        <Button
          colorScheme='facebook'
          p='5'
          my='5'
          w='full'
          gap='2'
          fontWeight='normal'
        >
          <FaSignInAlt /> Signup
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
