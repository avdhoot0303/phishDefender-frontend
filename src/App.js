import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Splitter,Layout, Button, Drawer, Space } from 'antd';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailPreview from './components/EmailPreview';
import EmailAnalysis from './components/EmailAnalysis';
import Header from './components/AppHeader';
import AccountInsights from './components/AccountInsights'; // New component for drawer content

const { Sider } = Layout;

const App = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state

  // Fetch emails from the API
  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/emails', {
          params: {
            max_results: 25,
          },
        });
        setEmails(response.data.emails);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch emails');
        setLoading(false);
      }
    };

    fetchEmails();
  }, [selectedFolder]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Button type="primary" onClick={openDrawer} style={{ marginLeft: 'auto' }}>
          Account Insights
        </Button>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Sidebar selectedFolder={selectedFolder} onSelectFolder={setSelectedFolder} />
        </Sider>
        <Splitter
          style={{
            height: 'calc(100vh - 64px)', // Adjust height based on header
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Splitter.Panel collapsible>
            <div
              style={{
                height: '100%',
                padding: '10px',
                background: '#f5f5f5',
              }}
            >
              <EmailList
                emails={emails}
                selectedFolder={selectedFolder}
                onSelectEmail={setSelectedEmail}
                loading={loading}
                error={error}
              />
            </div>
          </Splitter.Panel>
          <Splitter.Panel
            collapsible={{
              start: true,
            }}
          >
            <div
              style={{
                height: '100%',
                padding: '10px',
                background: '#fff',
                overflowY: 'auto',
              }}
            >
              <EmailPreview email={selectedEmail} />
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div
              style={{
                height: '100%',
                padding: '10px',
                background: '#f5f5f5',
                overflowY: 'auto',
              }}
            >
              <EmailAnalysis email={selectedEmail} />
            </div>
          </Splitter.Panel>
        </Splitter>
      </Layout>
      <Drawer
        title="Account Insights"
        placement="right"
        width={500}
        onClose={closeDrawer}
        open={drawerOpen}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Close</Button>
          </Space>
        }
      >
        <AccountInsights />
      </Drawer>
    </Layout>
  );
};

export default App;
