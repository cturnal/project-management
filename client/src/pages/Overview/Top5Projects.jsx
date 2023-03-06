import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { StarIcon, ViewIcon } from '@chakra-ui/icons';
import { useProject } from '../../context/ProjectContext';
import useGetProjects from '../../hooks/project/useGetProjects';
import Rating from './Rating';

function Top5Projects() {
  const { loading } = useGetProjects('top-5-projects');
  const { projects } = useProject();
  if (loading) return <Spinner />;
  return (
    <>
      <Heading mb='8' size='md'>
        Top 5 projects
      </Heading>
      <Flex
        gap={3}
        alignContent='center'
        justifyContent='center'
        flexWrap='wrap'
      >
        {projects &&
          projects.map((x) => (
            <Card
              key={x.id}
              rounded={10}
              w='250px'
              borderTop='8px'
              borderColor='#3b5998'
            >
              <CardHeader>
                <Heading size='md'>{x.name}</Heading>
                <Text color='gray.600' fontWeight='bold'>
                  Status: {x.status}
                </Text>
                <Flex mt='10px' alignItems='center'>
                  {x.ratingsAverage}({x.ratingsQuantity})
                  <Rating rating={x.ratingsAverage} />
                </Flex>
              </CardHeader>
              <AvatarGroup size='sm' max={3} mx={4}>
                <Avatar
                  size='sm'
                  name={x.client?.name}
                  src={'/images/users/' + x.client?.photo}
                />
                <Avatar
                  size='sm'
                  name={x.manager?.name}
                  src={'/images/users/' + x.manager?.photo}
                />
                {x.team.map((dev) => (
                  <Avatar
                    key={dev.id}
                    name={dev.name}
                    src={'/images/users/' + dev.photo}
                  />
                ))}
              </AvatarGroup>
              <CardBody>
                <Text>{x.description}</Text>
              </CardBody>
              <Divider />

              <CardFooter>
                <Button colorScheme='facebook'>View Project</Button>
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </>
  );
}

export default Top5Projects;
