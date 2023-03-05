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

function Top5Managers({ role }) {
  const { loading } = useGetAgents(role);
  const { managers } = useAgent();
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
        {managers &&
          managers.map((manager) => (
            <Card key={manager.id} rounded={10} p='5' maxW='250px'>
              <Heading size='sm'>{manager.name}</Heading>
              <Text>{manager.description}</Text>
              <CardFooter>
                {manager.ratingsAverage}({manager.ratingsQuantity})
                <StarIcon m='auto' ml='4px' />
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </>
  );
}

export default Top5Managers;
