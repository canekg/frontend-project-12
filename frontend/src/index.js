import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_NOT_SECRET_TOKEN,
    environment: 'production',
  };
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {await init()}
      </ErrorBoundary>
    </Provider>,
  );
};

app();
