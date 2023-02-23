import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
} from '@chakra-ui/react';
import { FaFolder, FaUserTie, FaUsers, FaUser } from 'react-icons/fa';

const managerTabs = [
  {
    name: 'My Projects',
    icon: FaFolder,
  },
  {
    name: 'My Developers',
    icon: FaUsers,
  },
  {
    name: 'My Clients',
    icon: FaUser,
  },
];

const developerTabs = [
  {
    name: 'My Tasks',
    icon: FaFolder,
  },
  {
    name: 'My Managers',
    icon: FaUsers,
  },
];

const clientTabs = [
  {
    name: 'My Projects',
    icon: FaFolder,
  },
  {
    name: 'My Managers',
    icon: FaUsers,
  },
];

function Dashboard() {
  const role = 'client';
  return (
    <Container>
      <Tabs size='md' isFitted>
        <TabList>
          {(
            (role === 'manager' && managerTabs) ||
            (role === 'developer' && developerTabs) ||
            (role === 'client' && clientTabs)
          ).map((tab) => (
            <Tab
              key={tab.name}
              flexDirection={{ base: 'column', sm: 'row' }}
              roundedTop={10}
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

export default Dashboard;
