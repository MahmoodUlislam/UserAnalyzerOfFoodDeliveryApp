import React from 'react';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';

export default function App() {
  return (
    <>
      {/* this leyout is for future optimization */}
      <Layout>
        <Landing />
      </Layout>
    </>
  );
}


