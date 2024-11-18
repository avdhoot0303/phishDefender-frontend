import React from 'react';
import { List, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const EmailList = ({ emails, onSelectEmail }) => {
  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        background: '#f5f5f5',
        maxHeight: 'calc(100vh - 64px)', // Adjust based on header height
      }}
    >
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={emails}
        renderItem={(email) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => onSelectEmail(email)}
              style={{
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Title level={5}>{email.Subject}</Title>
              <Text type="secondary">
                <strong>From:</strong> {email.Sender}
              </Text>
              <br />
              <Text>{email.Snippet}</Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default EmailList;
