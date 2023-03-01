import { EmailIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Avatar,
} from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import { useUpdateProfile } from '../../hooks/user/useUpdateProfile';

function UpdateProfileForm() {
  const { user } = useAuth();
  const { values, handleChange, file, handleFile, resetFile } = useForm({
    name: user.name,
    email: user.email,
  });
  const { update, loading } = useUpdateProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', values.name);
    form.append('email', values.email);
    if (file) form.append('photo', file);

    await update(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          gap={4}
          m='auto'
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'left', sm: 'center' }}
        >
          <Avatar
            size='2xl'
            src={'/images/users/' + user.photo}
            name={user.name}
          />
          <Input
            type='file'
            name='photo'
            onChange={handleFile}
            size='sm'
            variant='unstyled'
          />
        </Flex>
        <InputGroup my='4' bg='white' shadow='sm' rounded={10}>
          <InputLeftAddon children={<InfoIcon />} bg='#3b5998' color='white' />
          <Input
            type='text'
            name='name'
            value={values.name || ''}
            onChange={handleChange}
            placeholder='Full Name'
          />
        </InputGroup>

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
          <FaSignInAlt /> Update Profile
        </Button>
      </form>
    </>
  );
}

export default UpdateProfileForm;
