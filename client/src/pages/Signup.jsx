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
    <Container shadow='md' bg='white' p='6' m='auto' rounded='10' w='90vw'>
      <Flex gap='2'>
        <FaUserPlus size='35' />
        <Heading mb='8' size='lg'>
          Signup
        </Heading>
      </Flex>
      <form>
        <InputGroup my='4'>
          <InputLeftAddon children={<InfoIcon />} />
          <Input type='text' placeholder='Full Name' />
        </InputGroup>

        <InputGroup my='4'>
          <InputLeftAddon children={<EmailIcon />} />
          <Input type='email' placeholder='Email' />
        </InputGroup>

        <InputGroup my='4'>
          <InputLeftAddon children={<LockIcon />} />
          <Input type={show ? 'text' : 'password'} placeholder='password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4'>
          <InputLeftAddon children={<LockIcon />} />
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Confirm Password'
          />
        </InputGroup>
        <InputGroup my='4'>
          <InputLeftAddon children={<AtSignIcon />} />
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
