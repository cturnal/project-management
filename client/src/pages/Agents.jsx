import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
} from '@chakra-ui/react';
import { FaUserTie, FaUsers } from 'react-icons/fa';

const agentsTab = [
  {
    name: 'Managers',
    icon: FaUserTie,
  },
  {
    name: 'Developers',
    icon: FaUsers,
  },
];

function Agents() {
  return (
    <Container>
      <Tabs size='md' isFitted>
        <TabList>
          {agentsTab.map((tab) => (
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

export default Agents;
