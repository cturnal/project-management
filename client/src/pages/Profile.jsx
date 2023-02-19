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
} from '@chakra-ui/react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';

function Profile() {
  return (
    <Container
      justifyContent='center'
      justifyItems='center'
      textAlign='center'
      alignContent='center'
      alignItems='center'
      m='auto'
    >
      <Heading mb='8' size='md'>
        YOUR ACCOUNT SETTINGS
      </Heading>
      <form>
        <Image
          borderRadius='full'
          boxSize='150px'
          src='https://bit.ly/dan-abramov'
          alt='Dan Abramov'
        />
        <InputGroup my='4'>
          <InputLeftAddon children={<InfoIcon />} />
          <Input type='text' placeholder='Full Name' />
        </InputGroup>
        <InputGroup my='4'>
          <InputLeftAddon children={<EmailIcon />} />
          <Input type='email' placeholder='Email' />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children={<LockIcon />} />
          <Input type='text' placeholder='password' />
        </InputGroup>

        <Button colorScheme='facebook' p='5' my='5' w='full' gap='2'>
          <FaSignInAlt /> Update Profile
        </Button>
      </form>
      <form>
        <InputGroup my='4'>
          <InputLeftAddon children={<LockIcon />} />
          <Input type='text' placeholder='password' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm'></Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4'>
          <InputLeftAddon children={<LockIcon />} />
          <Input type='text' placeholder='Confirm Password' />
        </InputGroup>
        <InputGroup my='4'>
          <InputLeftAddon children={<AtSignIcon />} />
          <Select placeholder='User Role' roundedLeft='0'>
            <option value='developer'>Developer</option>
            <option value='client'>Client</option>
            <option value='manager'>Manager</option>
          </Select>
        </InputGroup>
      </form>
    </Container>
  );
}

export default Profile;
