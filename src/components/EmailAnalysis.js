import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

const EmailAnalysis = ({ email, style }) => {
  if (!email) {
    return (
      <Card style={{ ...style, textAlign: 'center' }}>
        <Title level={4}>No Email Selected</Title>
        <Text>Select an email to see the analysis.</Text>
      </Card>
    );
  }

  // Placeholder data for analysis
  const isSafe = email.safe ?? true; // Default to true if `safe` is undefined
  const predictability = email.predictability ?? 100; // Default to 100% if not provided

  return (
    <Card style={style}>
      <Title level={4}>Email Analysis</Title>
      <Text>
        <strong>Status:</strong>{' '}
        {isSafe ? (
          <Tag color="green">Safe</Tag>
        ) : (
          <Tag color="red">Potentially Unsafe</Tag>
        )}
      </Text>
      <br />
      <Text>
        <strong>Predictability:</strong> {predictability}%
      </Text>
    </Card>
  );
};

export default EmailAnalysis;
