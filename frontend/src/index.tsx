import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import store from './redux/store';
import { compose, applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";

import reducers from './redux/reducers';

import './bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-bootstrap/dist/react-bootstrap.min.js";

import App from './App';

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk)));

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
