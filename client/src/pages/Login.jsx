import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Input,
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Container shadow='md' bg='white' p='6' m='auto' rounded='10' w='90vw'>
      <Flex gap='2'>
        <FaUser size='30' />
        <Heading mb='8' size='lg'>
          Login
        </Heading>
      </Flex>
      <form>
        <InputGroup my='4'>
          <InputLeftAddon children={<EmailIcon />} />
          <Input type='email' placeholder='Email' />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children={<LockIcon />} />
          <Input type={show ? 'text' : 'password'} placeholder='password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button colorScheme='facebook' p='5' my='5' w='full' gap='2'>
          <FaSignInAlt /> login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
