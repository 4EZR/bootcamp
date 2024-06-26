// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comment from '../pages/Comment';
import Home from '../pages/Home';
import Times from '../pages/Time';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => (
    <Router>
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/comment" element={<Comment />} />
                <Route path="/time" element={<Times />} />
            </Routes>
        </MainLayout>
    </Router>
);

export default AppRoutes;
