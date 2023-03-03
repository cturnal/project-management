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
import { useProject } from '../../context/ProjectContext';
import useGetProjects from '../../hooks/project/useGetProjects';

function Top5Projects() {
  const { loading } = useGetProjects('top-5-projects');
  const { projects } = useProject();
  if (loading) return <Spinner />;
  return (
    <>
      <Heading mb='8' size='md'>
        Top 5 Projects
      </Heading>
      <Flex
        gap={3}
        alignContent='center'
        justifyContent='center'
        flexWrap='wrap'
      >
        {projects &&
          projects.map((project) => (
            <Card key={project.id} rounded={10} p='5' maxW='250px'>
              <Heading size='sm'>{project.name}</Heading>
              <Text>{project.description}</Text>
              <CardFooter>
                {project.ratingsAverage}({project.ratingsQuantity})
                <StarIcon m='auto' ml='4px' />
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </>
  );
}

export default Top5Projects;
