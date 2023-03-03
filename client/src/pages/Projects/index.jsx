import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
} from '@chakra-ui/react';
import { CheckIcon, ArrowUpIcon, RepeatClockIcon } from '@chakra-ui/icons';

const projectsTab = [
  {
    name: 'Completed',
    icon: CheckIcon,
  },
  {
    name: 'In-progress',
    icon: ArrowUpIcon,
  },
  {
    name: 'In-que',
    icon: RepeatClockIcon,
  },
];

function Projects() {
  return (
    <Container>
      <Tabs size='md' isFitted>
        <TabList>
          {projectsTab.map((tab) => (
            <Tab
              key={tab.name}
              flexDirection={{ base: 'column', sm: 'row' }}
              roundedTop='10'
              gap={1}
              px={{ base: '2', sm: '4' }}
              fontSize={{ base: 11, sm: 12, md: 14 }}
              _selected={{
                bg: '#3b5998',
                color: 'white',
              }}
            >
              <Icon as={tab.icon} />
              {tab.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>Top 5 Projects</TabPanel>
          <TabPanel>Top 5 Managers</TabPanel>
          <TabPanel>Top 5 Developers</TabPanel>
          <TabPanel>Top 5 Client</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Projects;
