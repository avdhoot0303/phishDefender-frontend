import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const EmailPreview = ({ email }) => {
  if (!email) {
    return (
      <div
        style={{
          flex: 2,
          padding: '20px',
          textAlign: 'center',
          background: '#fff',
          height: 'calc(100vh - 64px)', // Fixed height based on viewport minus header
          overflowY: 'auto', // Scrollable when no email is selected
        }}
      >
        <Text type="secondary">Select an email to preview</Text>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 2,
        padding: '20px',
        background: '#fff',
        height: 'calc(100vh - 64px)', // Fixed height for the email preview
        overflowY: 'auto', // Enable vertical scrolling for long content
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <Card
        bordered={false}
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          wordWrap: 'break-word', // Ensure long words wrap
          whiteSpace: 'pre-wrap', // Preserve formatting and allow wrapping
          overflowWrap: 'break-word', // Break long words or URLs
          width: '100%', // Ensure the card doesn't exceed the container width
          maxWidth: '100%', // Prevent content from expanding horizontally
        }}
      >
        <Title level={4}>{email.Subject}</Title>
        <Text type="secondary">
          <strong>From:</strong> {email.Sender}
        </Text>
        <br />
        <Text type="secondary">
          <strong>Date:</strong> {email.Date}
        </Text>
        <br />
        <br />
        <Text>
          <strong>Message:</strong>
        </Text>
        <div
          style={{
            whiteSpace: 'pre-wrap', // Preserve line breaks and wrap long text
            wordWrap: 'break-word', // Ensure long words break properly
            overflowWrap: 'break-word', // Handle long URLs or words
            marginTop: '10px',
          }}
        >
          {email.Message_body}
        </div>
      </Card>
    </div>
  );
};

export default EmailPreview;
