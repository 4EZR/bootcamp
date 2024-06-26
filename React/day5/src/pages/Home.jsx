// src/pages/Home.jsx
import React from 'react';
import Card from '@/components/homeCard';
import img1 from '@/assets/home/gambar1.png';
import img2 from '@/assets/home/gambar2.png';
import img3 from '@/assets/home/gambar3.png';
const Home = () => (
    <div className=' min-h-screen '>
        <div className='bg-[#FBFBFB] shadow-lg px-10 py-16 rounded-xl'>

            <p className='text-2xl mb-12'>Biro Kerohanian Service</p>

            <div className=' grid grid-cols-3 gap-5'>

                <Card
                    img={img1}
                    title='Daily Inspiration'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

                />
                <Card
                    img={img2}
                    title='Song of Verse'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                />
                  <Card
                    img={img3}
                    title='Renungan'
                    details='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                />
            </div>



        </div>
    </div>
);

export default Home;
