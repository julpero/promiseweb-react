import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { socket, SocketContext } from "./socket";

import './App.css';

import HomeScreen from './screens/HomeScreen';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route index element={<HomeScreen />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SocketContext.Provider>
    );
  }
}

export default App;
