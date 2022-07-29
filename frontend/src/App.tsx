import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";

import './App.css';

import HomeScreen from './screens/HomeScreen';

class App extends React.Component {
  static socket = io();
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route index element={<HomeScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
