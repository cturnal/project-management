import { LockIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';
import useForm from '../../hooks/useForm';
import useToggle from '../../hooks/useToggle';
import useUpdatePassword from '../../hooks/user/useUpdatePassword';

function UpdatePasswordForm() {
  const { values, handleChange, resetForm } = useForm({
    password: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const { isToggle, toggle } = useToggle();
  const { loading, update } = useUpdatePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(values, resetForm);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='password'
            placeholder='Current Password'
            value={values.password}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={toggle}>
              {isToggle ? 'hide' : 'show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='newPassword'
            placeholder='New Password'
            value={values.newPassword}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<LockIcon />} bg='#3b5998' color='white' />
          <Input
            type={isToggle ? 'text' : 'password'}
            name='passwordConfirm'
            placeholder='Confirm Password'
            value={values.passwordConfirm}
            onChange={handleChange}
          />
        </InputGroup>

        <Button
          type='submit'
          colorScheme='facebook'
          p='5'
          my='5'
          gap='2'
          fontWeight='light'
          w='100%'
          isLoading={loading ? true : false}
        >
          <FaSignInAlt /> Update Password
        </Button>
      </form>
    </>
  );
}

export default UpdatePasswordForm;
