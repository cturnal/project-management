import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
function Dashboard() {
  return (
    <Container>
      <Tabs size='sm'>
        <TabList>
          <Tab _selected={{ bg: '#3b5998', color: 'white', roundedTop: '10' }}>
            Hall of Fame
          </Tab>
          <Tab _selected={{ bg: '#3b5998', color: 'white', roundedTop: '10' }}>
            Projects Overview{' '}
          </Tab>
          <Tab
            _selected={{
              bg: '#3b5998',
              color: 'white',
              roundedTop: '10',
            }}
          >
            Users Overview
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px='0'>
            <Tabs
              variant='soft-rounded'
              colorScheme='facebook'
              size='sm'
              align='start'
            >
              <TabList>
                <Tab fontSize='12px'>Projects</Tab>
                <Tab fontSize='12px'>Managers</Tab>
                <Tab fontSize='12px'>Developers</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Dashboard;
