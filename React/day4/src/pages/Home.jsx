// src/pages/Home.jsx
import React from 'react';
import { faker } from '@faker-js/faker';
import { Separator } from '@/components/ui/separator';
import CommentContainer from '@/components/CommentContainer';
import dayjs from 'dayjs';
const img = () => ({
  image: faker.image.abstract(),
  title: faker.lorem.lines()
})

const imgData = img();

const Home = () => (
  <div className='p-10 pt-20 flex min-h-screen justify-center items-center'>
    <div>

      <p className='text-5xl mb-10'>{imgData.title}</p>
      <img src={imgData.image} alt="Fake" className="max-h-96 rounded-lg object-cover w-screen" />

      <CommentContainer />


    </div>
  </div>
);

export default Home;
