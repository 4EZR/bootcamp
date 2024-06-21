// src/pages/Home.jsx
import React from 'react';
import { faker } from '@faker-js/faker';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
const img = () => ({
  image: faker.image.abstract(),
  title: faker.lorem.lines()
})

const generateFakeData = () => ({
  image: faker.image.avatar(),
  name: faker.person.firstName(),
  comment: faker.lorem.sentence(),
  date: faker.date.past()
});


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

const imgData = img();

const fakeData = Array.from({ length: 3 }, () => generateFakeData());
const Home = () => (
  <div className='p-10 pt-20 flex min-h-screen justify-center items-center'>
    <div>

      <p class='text-5xl mb-10'>{imgData.title}</p>
      <img src={imgData.image} alt="Fake" className="max-h-96 rounded-lg object-cover w-screen" />
      
      <div className=' rounded-md p-4 mt-10'>
        <p className='mb-10'>Comment ({fakeData.length})</p>
        <Separator/>
        {fakeData.map((data, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <img src={data.image} alt="Fake" className="h-10 w-10 rounded-full" />
            <div>
              <div className='flex gap-3'>
                <p className="capitalize text-lg leading-4">{data.name}</p>  <p className="text-gray-400 text-sm">{formatDate(data.date)}</p>

              </div>     <p className="text-gray-600">{data.comment}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

export default Home;
