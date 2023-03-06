import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
} from '@chakra-ui/react';
import { FaFolder, FaUserTie, FaUsers, FaUser } from 'react-icons/fa';
import Top5Agents from './Top5Agents';
import Top5Projects from './Top5Projects';

const overviewTabs = [
  {
    name: 'Projects',
    icon: FaFolder,
  },
  {
    name: 'Managers',
    icon: FaUserTie,
  },
  {
    name: 'Developers',
    icon: FaUsers,
  },
  {
    name: 'Clients',
    icon: FaUser,
  },
];

function Overview() {
  return (
    <>
      <Tabs size='md' mx={{ base: '5', md: '40px' }}>
        <TabList>
          {overviewTabs.map((tab) => (
            <Tab
              key={tab.name}
              flexWrap='wrap'
              roundedTop='10'
              gap={1}
              px={{ base: '8px', sm: '4' }}
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
          <TabPanel>
            <Top5Projects />
          </TabPanel>
          <TabPanel>
            <Top5Agents role='managers' />
          </TabPanel>
          <TabPanel>
            <Top5Agents role='developers' />
          </TabPanel>
          <TabPanel>
            <Top5Agents role='clients' />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Overview;
