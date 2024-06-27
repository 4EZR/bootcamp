// src/components/SearchBar.js
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(query);
        }
    };

    return (
        <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for photos"
            className="w-full px-4 py-2 border rounded-md"
        />
    );
};

export default SearchBar;
