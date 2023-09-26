import React from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
registerServiceWorker();
