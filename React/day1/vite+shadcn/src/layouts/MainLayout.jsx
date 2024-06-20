// src/layouts/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header  from "./components/header";

const MainLayout = ({ children }) => (
  <div>
    <Header/>
    <main className='min-h-screen bg-test'>
      {children}
    </main>
    <footer className=''>
      <p>© Developer by SIM</p>
    </footer>
  </div>
);

export default MainLayout;
