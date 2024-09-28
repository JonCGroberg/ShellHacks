import React, { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    console.log('LoginPage mounted!'); // Check if the component is mounted

    const initiateLogin = () => {
      console.log('Redirecting to login page...'); // Log the redirection
      window.location.href = 'http://localhost:3000/login'; // Perform a full-page redirect to the backend login route
    };

    initiateLogin(); // Start the login process by redirecting to Auth0
  }, []);

  return (
    <div>
      <h1>Redirecting to login...</h1>
    </div>
  );
};

export default LoginPage;