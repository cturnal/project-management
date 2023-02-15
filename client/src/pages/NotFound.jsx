import { Container, Heading } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Container textAlign='center'>
      <Heading as='h1' size='4xl' noOfLines={1}>
        404
      </Heading>
      <Heading as='h1' size='2xl' noOfLines={1}>
        Page not found!
      </Heading>
    </Container>
  );
};

export default NotFound;
