import React from 'react';
import { Typography, Card, List } from 'antd';

const { Title, Text } = Typography;

const AccountInsights = () => {
  // Placeholder insights
  const insights = [
    { key: 1, title: 'Total Emails Processed', value: '1,245' },
    { key: 2, title: 'Safe Emails', value: '1,200' },
    { key: 3, title: 'Flagged Emails', value: '45' },
    { key: 4, title: 'Model Accuracy', value: '98.7%' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={4}>Account Insights</Title>
      <List
        dataSource={insights}
        renderItem={(item) => (
          <List.Item>
            <Card bordered={false} style={{ width: '100%' }}>
              <Text>
                <strong>{item.title}:</strong> {item.value}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AccountInsights;
