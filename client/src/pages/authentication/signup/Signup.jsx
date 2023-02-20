import {
  AtSignIcon,
  EmailIcon,
  InfoIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
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
import { useState } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Container>
      <Flex gap='2'>
        <FaUserPlus size='35' />
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
          <Input type={show ? 'text' : 'password'} placeholder='password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={show ? 'text' : 'password'}
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

        <Button colorScheme='facebook' p='5' my='5' w='full' gap='2'>
          <FaSignInAlt /> Signup
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
