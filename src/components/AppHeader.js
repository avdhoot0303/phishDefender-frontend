import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const AppHeader = ({ openDrawer }) => {
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
      <Button
        type="primary"
        onClick={openDrawer}
        style={{
          marginLeft: 'auto',
          backgroundColor: '#1890ff',
          borderColor: '#1890ff',
        }}
      >
        Account Insights
      </Button>
    </Header>
  );
};

export default Header;
