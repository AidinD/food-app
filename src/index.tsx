import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Stores/StoreProvider';
import { RouterContext } from 'mobx-state-router';
import { initRouter } from './Routing/InitRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const routerStore = initRouter();

root.render(
  <React.StrictMode>
    <RouterContext.Provider value={routerStore}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </RouterContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
