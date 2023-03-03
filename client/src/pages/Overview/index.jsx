import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaFolder, FaUserTie, FaUsers, FaUser } from 'react-icons/fa';
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
  const isFitted = useBreakpointValue({ base: true, sm: true, md: false });
  return (
    <>
      <Tabs size='md' isFitted={isFitted} mx={{ base: '5', md: '40px' }}>
        <TabList>
          {overviewTabs.map((tab) => (
            <Tab
              key={tab.name}
              flexDirection={{ base: 'column', sm: 'row' }}
              roundedTop='10'
              gap={1}
              px={{ base: '1', sm: '4' }}
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
          <TabPanel>Top 5 Managers</TabPanel>
          <TabPanel>Top 5 Developers</TabPanel>
          <TabPanel>Top 5 Client</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Overview;
