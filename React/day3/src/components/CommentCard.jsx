// src/components/CommentCard.jsx
import React from 'react';
import dayjs from 'dayjs';

const formatDate = (date) => {
  const now = dayjs();
  const diffInDays = now.diff(date, 'day');
  const diffInYears = now.diff(date, 'year');

  if (diffInDays === 0) {
    return `today at ${dayjs(date).format('h:mm A')}`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInYears < 1) {
    return dayjs(date).format('MMMM D');
  } else {
    return dayjs(date).format('MMMM D, YYYY');
  }
};

const CommentCard = ({ image, name, comment, date }) => (
  <div className="flex items-center gap-4 mb-4">
    <img src={image} alt="User" className="h-10 w-10 rounded-full" />
    <div>
      <div className='flex gap-3'>
        <p className="capitalize text-lg leading-4">{name}</p>
        <p className="text-gray-400 text-sm">{formatDate(date)}</p>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  </div>
);

export default CommentCard;