import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  FormErrorMessage,
  FormControl,
  FormHelperText,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useLogin } from '../../../hooks/authentication/useLogin';
import useToggle from '../../../hooks/useToggle';

function LoginForm() {
  const { isToggle, toggle } = useToggle();
  const [values, setValues] = useState('');
  const { login, loading, error } = useLogin();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: error,
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(values.email, values.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<EmailIcon />} bg='#3b5998' color='white' />
          <Input
            type='email'
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            placeholder='Email'
            errorBorderColor={error ? 'crimson' : ''}
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
        >
          <FaSignInAlt /> login
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
