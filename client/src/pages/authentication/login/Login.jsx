import { Container, Heading, Flex } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import LoginForm from './LoginForm';

const Login = () => (
  <Container>
    <Flex gap='2'>
      <FaUser size='30' />
      <Heading mb='8' size='md'>
        Login
      </Heading>
    </Flex>
    <LoginForm />
  </Container>
);

export default Login;
