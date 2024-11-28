import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Row, Col, Divider, Skeleton, Typography, Card } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const EmailList = ({ emails, loading, setLoading, fetchEmails, setPage, page }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Sort the emails in descending order of the date
  const sortedEmails = emails.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());

  // Define the columns for the table
  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text) => {
        const [name, email] = text.split('<');
        return (
          <div>
            <strong>{name.trim()}</strong>
            <div style={{ fontSize: '0.9em', color: 'gray', width: '80%' }}>
              &lt;{email}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{moment(text).fromNow()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => openDrawer(record)}>
          View Email
        </Button>
      ),
    },
  ];

  // Open the drawer and set the selected email
  const openDrawer = (email) => {
    setSelectedEmail(email);
    setDrawerVisible(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Load more emails when the "Load More" button is clicked
  const onLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const response = await fetchEmails(nextPage);
      if (response && response.data && response.data.emails.length < 25) {
        setHasMore(false); // Disable Load More if no more emails
      }
    } catch (error) {
      console.error('Error fetching more emails', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Table to display the email list */}
      <Table
        columns={columns}
        dataSource={sortedEmails}
        rowKey="id"
        pagination={false} // Disable default pagination, handle manually
        loading={loading}
        style={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
        }}
      />

      {/* Load More button */}
      {hasMore && !loading && (
        <Button
          type="link"
          onClick={onLoadMore}
          style={{ textAlign: 'center', display: 'block', width: '100%' }}
        >
          Load More
        </Button>
      )}

      {/* Skeleton Loader for email list */}
      {loading && <Skeleton active paragraph={{ rows: 6 }} />}
      {/* Drawer to view the email details */}
      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Card>
        {selectedEmail && (
          <>
            <p><strong>From:</strong> {selectedEmail.from}</p>
            <p><strong>Subject:</strong> {selectedEmail.subject}</p>
            <p><strong>Date:</strong> {moment(selectedEmail.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <Divider />
            <Row>
              <Col span={24}>
                <p><strong>Email Content:</strong></p>
                <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {selectedEmail.body || selectedEmail.snippet}
                </div>
              </Col>
            </Row>
          </>
        )}
        </Card>
      </Drawer>

    </>
  );
};

export default EmailList;
