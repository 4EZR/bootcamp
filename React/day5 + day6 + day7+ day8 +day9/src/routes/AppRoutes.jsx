// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Comment from '../pages/Comment';
import Home from '../pages/Home';
import Times from '../pages/Time';
import MainLayout from '../layouts/MainLayout';
import SearchPhotoGallery from '../pages/Search';
import Youtube from '../pages/Youtube';
import Redux from '../pages/Redux';
import Form from '../pages/Form';


const AppRoutes = () => (
    <Router>
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/comment" element={<Comment />} />
                <Route path="/time" element={<Times />} />
                <Route path='/search' element={<SearchPhotoGallery />} />
                <Route path='/youtube' element={<Youtube />} />
                <Route path='/redux' element={<Redux />} />
                <Route path='/form' element={<Form />} />
            </Routes>
        </MainLayout>
    </Router>
);

export default AppRoutes;
