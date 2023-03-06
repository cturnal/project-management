import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useAgent } from '../../context/AgentContext';
import useGetAgents from '../../hooks/agent/useGetAgents';
import Rating from './Rating';

function Top5Agents({ role }) {
  useGetAgents(role);
  const { [role]: agents } = useAgent();
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
        {agents &&
          agents.map((x) => (
            <Card key={x.id} rounded={10} p='5' maxW='250px'>
              <Heading size='sm'>{x.name}</Heading>
              <Text>{x.description}</Text>
              <CardFooter alignItems='center' gap={1}>
                {x.ratingsAverage}({x.ratingsQuantity})
                <Rating rating={x.ratingsAverage} />
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </>
  );
}

export default Top5Agents;
