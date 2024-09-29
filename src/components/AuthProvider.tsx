import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-4lqqv2eo0vcmaugw.us.auth0.com"
    clientId="net3axTkEVeciYcXn4D8tNAcLWxHfiXh"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <LoginButton />
  </Auth0Provider>,
);