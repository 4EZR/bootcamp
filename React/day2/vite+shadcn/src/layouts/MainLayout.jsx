// src/layouts/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header  from "@/components/header";

const MainLayout = ({ children }) => (
  <div>
    <Header/>
    <main className=' bg-slate-200'>
      {children}
    </main>
    <footer className='w-full p-3'>
      <p class='text-center text-sm'>2024 © 4EZR</p>
    </footer>
  </div>
);

export default MainLayout;
