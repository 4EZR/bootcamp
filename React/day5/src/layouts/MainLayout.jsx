// src/layouts/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/header";

import bg from '@/assets/bg.svg'
import Sidebar from '@/components/sidebar';

const MainLayout = ({ children }) => (
  <div className='overflow-x-hidden bg-[#B8CDF8]'>
    <Header />
    <Sidebar />
    <div className="bg-white p-10 ms-5 md:ms-20 mt-20 2xl:ms-28 rounded-3xl me-5 bg-cover bg-center"
         style={{ backgroundImage: `url(${bg})` }}>
      {children}
    </div>
    <footer className='w-full p-3'>
      <p className='text-center text-sm'>2024 © 4EZR</p>
    </footer>
  </div>
);

export default MainLayout;
