import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
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
  Select,
} from '@chakra-ui/react';

import { useAuth } from '../../context/AuthContext';
import useToggle from '../../hooks/useToggle';
import useForm from '../../hooks/useForm';
import { useSignup } from '../../hooks/authentication/useSignup';

function Signup() {
  const { values, handleChange } = useForm({});
  const { loading, signup } = useSignup();
  const { isToggle, toggle } = useToggle();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(values);
  };
  return (
    <Container>
      <Flex gap='2'>
        <Heading mb='8' size='md'>
          Signup
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit}>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<InfoIcon />} bg='#3b5998' color='white' />
          <Input
            type='text'
            name='name'
            placeholder='Full Name'
            value={values.name || ''}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<EmailIcon />} bg='#3b5998' color='white' />
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={values.email || ''}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='password'
            placeholder='password'
            value={values.password || ''}
            onChange={handleChange}
          />
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
            name='passwordConfirm'
            placeholder='Confirm Password'
            value={values.passwordConfirm || ''}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon
            children={<AtSignIcon />}
            bg='#3b5998'
            color='white'
          />
          <Select
            placeholder='User Role'
            roundedLeft='0'
            name='role'
            value={values.role || ''}
            onChange={handleChange}
          >
            <option value='developer'>Developer</option>
            <option value='client'>Client</option>
            <option value='manager'>Manager</option>
          </Select>
        </InputGroup>

        <Button
          type='submit'
          colorScheme='facebook'
          p='5'
          my='5'
          w='full'
          gap='2'
          fontWeight='normal'
          isLoading={loading ? true : false}
        >
          <FaSignInAlt /> Signup
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
