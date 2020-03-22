import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';
import App from './App';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);
