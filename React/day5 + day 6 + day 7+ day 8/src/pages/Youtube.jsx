import React, { useState } from 'react';
import { searchYoutube } from '../services/youtubeService';
import SearchBar from '@/components/SearchBar';

const Youtube = () => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            const data = await searchYoutube(query);
            setVideos(data.items);
            setCurrentVideo(data.items[0]);
        } catch (error) {
            console.error('Error searching videos:', error);
        } finally {
            setLoading(false);
        }
    };
    const formatPublishedAt = (publishedAt) => {
        const now = new Date();
        const publishDate = new Date(publishedAt);
        const diffTime = Math.abs(now - publishDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const handleThumbnailClick = (video) => {
        setCurrentVideo(video);
        setVideos(prevVideos => [
            ...prevVideos.filter(v => v.id.videoId !== video.id.videoId),
            currentVideo
        ]);
    };

    return (
        <div className="min-h-screen p-4">
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <p className="text-center mt-10">Loading...</p>
            ) : (
                <div className="mt-10 grid grid-cols-6 gap-10">
                    {currentVideo && (
                        <div className="col-span-5">
                            <iframe
                                width="100%"
                                height="780"
                                src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
                                title={currentVideo.snippet.title}

                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            <p className="text-2xl mt-10 ">{currentVideo.snippet.title}</p>
                            <p className="text-sm ">{formatPublishedAt(currentVideo.snippet.publishedAt)}</p>


                            <p className="text-sm text-slate-500 mt-3">{currentVideo.snippet.description}</p>
                        </div>
                    )}
                    <div className="col-span-1">
                        {videos
                            .filter(video => video.id.videoId !== currentVideo?.id.videoId)
                            .slice(0, 4)
                            .map((video) => (
                                <div
                                    key={video.id.videoId}
                                    className="cursor-pointer mb-2"
                                    onClick={() => handleThumbnailClick(video)}
                                >
                                    <img
                                        src={video.snippet.thumbnails.medium.url}
                                        alt={video.snippet.title}
                                        className="w-full"
                                    />
                                    <p className="text-sm mt-1">{video.snippet.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Youtube;