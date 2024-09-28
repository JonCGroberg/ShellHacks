import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Login Successful!</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default Callback;