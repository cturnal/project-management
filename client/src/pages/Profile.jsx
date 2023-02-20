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
} from '@chakra-ui/react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';

function Profile() {
  return (
    <Container m='auto'>
      <Heading mb='8' size='md'>
        YOUR ACCOUNT SETTINGS
      </Heading>
      <form>
        <Flex
          gap={4}
          m='auto'
          flexDirection={{ base: 'column', sm: 'row' }}
          w='full'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
          textAlign='center'
          justify='center'
        >
          <Image
            borderRadius='full'
            boxSize='150px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
          />

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

        <Button colorScheme='facebook' p='5' my='5' w='full' gap='2'>
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
          <Input type='text' placeholder='Current Password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm'></Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input type='text' placeholder='New Password' />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input type='text' placeholder='Confirm Password' />
        </InputGroup>

        <Button colorScheme='facebook' p='5' my='5' w='full' gap='2'>
          <FaSignInAlt /> Update Password
        </Button>
      </form>
    </Container>
  );
}

export default Profile;
