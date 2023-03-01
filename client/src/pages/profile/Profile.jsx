import { Container, Heading, Divider } from '@chakra-ui/react';

import UpdateProfileForm from './UpdateProfileForm';

function Profile() {
  return (
    <Container p='auto' m='auto'>
      <Heading mb='8' size='md'>
        YOUR ACCOUNT SETTINGS
      </Heading>
      <UpdateProfileForm />
      <Divider my={5} />
    </Container>
  );
}

export default Profile;
