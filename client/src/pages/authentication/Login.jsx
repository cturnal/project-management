import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Container,
  Heading,
  Flex,
} from '@chakra-ui/react';

import useForm from '../../hooks/useForm';
import useToggle from '../../hooks/useToggle';
import { useLogin } from '../../hooks/authentication/useLogin';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [values, handleChange] = useForm({});
  const { isToggle, toggle } = useToggle();
  const { loading, login } = useLogin();
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(values.email, values.password);
  };

  return (
    <Container>
      <Flex gap='2'>
        <Heading mb='8' size='md'>
          Login
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit}>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<EmailIcon />} bg='#3b5998' color='white' />
          <Input
            type='email'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            placeholder='Email'
          />
        </InputGroup>

        <InputGroup bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            placeholder='password'
            name='password'
            value={values.password || ''}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggle}>
              {isToggle ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          type='submit'
          colorScheme='facebook'
          p='5'
          my='5'
          w='full'
          gap='2'
          isLoading={loading ? true : false}
          fontWeight='normal'
        >
          <FaSignInAlt /> login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
