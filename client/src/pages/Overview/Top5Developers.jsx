import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useAgent } from '../../context/AgentContext';
import useGetAgents from '../../hooks/agent/useGetAgents';

function Top5Developers({ role }) {
  const { loading } = useGetAgents(role);
  const { developers } = useAgent();
  if (loading) return <Spinner />;
  return (
    <>
      <Heading mb='8' size='md'>
        Top 5 {role}
      </Heading>
      <Flex
        gap={3}
        alignContent='center'
        justifyContent='center'
        flexWrap='wrap'
      >
        {developers &&
          developers.map((developer) => (
            <Card key={developer.id} rounded={10} p='5' maxW='250px'>
              <Heading size='sm'>{developer.name}</Heading>
              <Text>{developer.description}</Text>
              <CardFooter>
                {developer.ratingsAverage}({developer.ratingsQuantity})
                <StarIcon m='auto' ml='4px' />
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </>
  );
}

export default Top5Developers;
