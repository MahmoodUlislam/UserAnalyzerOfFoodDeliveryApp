import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Profiles from './pages/Profiles';
export default function App() {

  return (
    <React.Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Profiles" element={<Profiles />} />
        </Routes>
      </Layout>
    </React.Fragment >
  );
}


