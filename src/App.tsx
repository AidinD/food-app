import React from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import { StoreProvider } from './Stores/StoreProvider';

function App() {
  return (
    <div className="App">
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
