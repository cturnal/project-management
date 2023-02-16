import { Flex, Heading } from '@chakra-ui/react';
import { FaRegLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <>
      <Link to='/'>
        <Heading size={{ base: 'md', sm: 'lg' }}>
          <Flex>
            PR <FaRegLightbulb />
            JECT
            <Heading as='span' color='#3b5998' size={{ base: 'md', sm: 'lg' }}>
              MGMT
            </Heading>
          </Flex>
        </Heading>
      </Link>
    </>
  );
};

export default NavLogo;
