import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Layout, Modal } from 'antd'; // Import Modal
import EmailList from './components/EmailList';

import Header from './components/AppHeader';
import SignIn from './components/SignIn';
import EmailAnalysis from './components/EmailAnalysis';
import SetToken from './components/SetToken';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import { FloatButton } from 'antd'; // Import the Floating Button
import { InfoCircleOutlined } from '@ant-design/icons'; // Icon for the button

const { Sider, Content } = Layout;

const App = () => {
  const [emails, setEmails] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication status
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility

  // Function to fetch emails after authentication
  const fetchEmails = async (page=1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://email-service-210145104871.us-central1.run.app/api/fetch_emails', {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        }      });
      // Add new emails to the existing emails
      if (page === 1) {
        setEmails(response.data.emails); // First page, replace existing emails
      } else {
        setEmails((prevEmails) => [...prevEmails, ...response.data.emails]); // Append new emails
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching emails', error);
    } finally {
      setLoading(false);
    }
  };

  // If the user is authenticated, fetch emails
  useEffect(() => {
    if (authenticated) {
      fetchEmails(page);
    }
  }, [authenticated, page]);

  // Function to show the modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to hide the modal
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn setAuthenticated={setAuthenticated} />} />
        <Route path="/setToken" element={<SetToken setAuthenticated={setAuthenticated} />} />
        
        <Route
          path="/inbox"
          element={authenticated ? (
            <Layout style={{ height: '100vh' }}>
              <Header>
                <AppHeader></AppHeader>
              </Header>
              <Layout>
                <Sider width={200} theme="light">
                  <Sidebar />
                </Sider>
                <Layout>
                  <Content style={{ padding: '0 50px', marginTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ width: '67%' }}>
                        <EmailList 
                        loading={loading}
                          setLoading={setLoading} // Pass setLoading as a prop
                          fetchEmails={fetchEmails}
                          setPage={setPage} // Pass setPage function to EmailList component
                          page={page}
                        emails={emails}  onSelectEmail={setSelectedEmail} />
                      </div>
                      <div style={{ width: '33%', marginLeft: '20px' }}>
                        <EmailAnalysis email={selectedEmail} />
                      </div>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          ) : (
            <Navigate to="/signIn" />
          )}
        />
      </Routes>

      {/* Floating Button */}
      <FloatButton
        shape='sqaure'
        type="primary"
        // icon={<InfoCircleOutlined />}
        description="Account Insights"
        onClick={showModal}
        style={{ position: 'fixed', right: 20, bottom: 20, insetInlineEnd:24, width:'20%'}}
      />

      {/* Modal for Account Insights */}
      <Modal
        title="Account Insights"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <p>Your account insights go here.</p>
        <p>For example, you can display recent activities, statistics, etc.</p>
        <button onClick={handleCancel}>Close</button>
      </Modal>
    </Router>
  );
};

export default App;
