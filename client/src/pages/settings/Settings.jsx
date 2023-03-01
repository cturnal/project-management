import { Container, Heading, Divider } from '@chakra-ui/react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileForm from './UpdateProfileForm';

function Settings() {
  return (
    <Container p='auto' m='auto'>
      <Heading mb='5' size='md'>
        YOUR ACCOUNT SETTINGS
      </Heading>
      <UpdateProfileForm />
      <Divider my={2} />
      <Heading mb='5' size='md'>
        CHANGE PASSWORD
      </Heading>
      <UpdatePasswordForm />
    </Container>
  );
}

export default Settings;
