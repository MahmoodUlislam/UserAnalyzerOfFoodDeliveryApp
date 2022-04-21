import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import {
  BrowserRouter
} from "react-router-dom";
import App from "./App";
import "./index.css";
import filterByStatusSlice from './slices/filterByStatusSlice';

const rootElement = document.getElementById("root");
const store = configureStore({
  reducer: {
    filterByStatusSlice
  }
}
);


render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>,
  rootElement
);