import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter
} from "react-router-dom";
import App from "./App";
import "./index.css";
import filterByStatusSlice from './slices/filterByStatusSlice';
const root = ReactDom.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    filterByStatusSlice
  }
}
);


root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);