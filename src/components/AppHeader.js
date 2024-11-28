import React from 'react';
import { Layout, Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, ScanOutlined, SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ openDrawer }) => {
  // Account menu
  const accountMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Your Account
      </Menu.Item>
      <Menu.Item key="2" icon={<ScanOutlined />}>
        Scan Now
      </Menu.Item>
      <Menu.Item key="3" icon={<SearchOutlined />}>
        Get Analysis
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#001529',
        color: '#fff',
        padding: '0 20px',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
        Email Dashboard
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Your Account section with Avatar */}
        <Dropdown overlay={accountMenu} trigger={['click']}>
          <Button
            type="text"
            icon={<Avatar style={{ marginRight: '10px' }} icon={<UserOutlined />} />}
            style={{ color: '#fff', display: 'flex', alignItems: 'center', fontSize: '16px' }}
          >
            Your Account
          </Button>
        </Dropdown>

        {/* Account Insights Button */}
        {/* <Button
          type="primary"
          onClick={openDrawer} // This opens the Account Insights drawer
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            marginLeft: '15px',
          }}
        >
          Account Insights
        </Button> */}
      </div>
    </Header>
  );
};

export default AppHeader;
