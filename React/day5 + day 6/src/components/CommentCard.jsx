// src/components/CommentCard.jsx
import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { IoIosHeart } from "react-icons/io";

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

const CommentCard = ({ image, name, comment, date, likes, onLike }) => (
  <div>

    <div className="flex items-start gap-4 mb-4 border-b-[1px] border-gray-300 py-5">
      <img src={image} alt="User" className="h-10 w-10 rounded-full" />
      <div>
        <div className='flex gap-3'>
          <p className="capitalize text-lg leading-4">{name}</p>
          <p className="text-gray-400 text-sm">{formatDate(date)}</p>
        </div>
        <p className="text-gray-600 mb-5 ">{comment}</p>
        <Button size='sm' icon="IoIosHeart" onClick={onLike}>
          <IoIosHeart /> <p className='mx-1 mb-0 pb-0 pt-0 text-sm font-light'>like</p> ({likes})
        </Button>

      </div>

    </div>

  </div>

);

export default CommentCard;