import React from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Landing from '../pages/Landing';
import Profiles from '../pages/Profiles';

export default function Routers() {
  return (
    <section className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Profiles" element={<Profiles />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};
