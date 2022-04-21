import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Profiles from './pages/Profiles';


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Landing />} />
        <Route path="profiles" element={<Profiles />} />
      </Route>
    </Routes>

  );
}


