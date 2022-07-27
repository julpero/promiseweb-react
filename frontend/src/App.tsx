import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { io } from "socket.io-client";

class App extends React.Component {
  static socket = io();
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="mt-4">
            <Routes>
                <Route index element={<HomeScreen />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
