import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ margin: '0 250px', marginBottom: '200px' }}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
