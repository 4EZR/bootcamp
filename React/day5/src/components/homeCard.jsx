import React from 'react';

const Card = ({ img, title, details }) => {
    return (
        <div className='bg-white shadow-lg rounded-xl p-8 cursor-pointer'>
            <img src={img} alt="" />
            <p className='text-lg font-medium mt-2 mb-3'>{title}</p>
            <p className='text-slate-400 mb-10'>{details}</p>
        </div>
    );
};

export default Card;
