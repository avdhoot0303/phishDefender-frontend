// SignIn.js
import React, {useEffect} from 'react';
import { Button, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignIn = ({setAuthenticated}) => {
  const navigate = useNavigate();
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (token){
      setAuthenticated(true)
      navigate('/inbox')
    }
  }, [])
  const handleGoogleSignIn = () => {
    // Trigger the backend authentication flow (redirect to /api/auth/login)
    window.location.href = 'https://email-service-210145104871.us-central1.run.app/api/auth/login'; // Adjust URL for your backend
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Title level={2}>Welcome to the Gmail Service</Title>
        <Button 
          type="primary" 
          size="large" 
          onClick={handleGoogleSignIn} 
          style={{ width: '200px', marginTop: '20px' }}
        >
          Sign in with Google
        </Button>
      </div>
    </Layout>
  );
};

export default SignIn;
