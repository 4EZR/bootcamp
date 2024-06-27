// src/components/SearchPhotoGallery.js
import React, { useState } from 'react';
import { searchPhotos } from '../services/unsplashService';
import SearchBar from '@/components/SearchBar';
import PhotoGrid from '@/components/PhotoGrid';

const SearchPhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
       
        try {
            setLoading(true);
            const data = await searchPhotos(query);
            setPhotos(data.results);
        } catch (error) {
            console.error('Error searching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <PhotoGrid photos={photos} />
            )}
        </div>
    );
};

export default SearchPhotoGallery;
