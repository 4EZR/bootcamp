import React from 'react';
import { Button } from '@/components/ui/button';
import { ComboboxDemo } from '@/components/ui/combobox';
import logo from '@/assets/penabur-icon.svg'; // Importing the image

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 px-10 bg-white/55 text-gray-800 border-b-[1px] border-gray-200 fixed top-0 w-screen backdrop-blur-lg">
            <div class='flex items-center gap-3'>
                <img src={logo} alt="Logo" className="h-8" /> {/* Using the imported image */}
                <p className="text-base font-medium capitalize leading-4 pl-3 border-gray-800 border-l-[2px]">
                    Pengembangan <br />
                    <span className='font-bold uppercase'>Sistem</span>
                </p>
            </div>
            <div className='flex gap-5'>
                <ComboboxDemo />
                <Button>Login</Button>
            </div>
        </header>
    );
};

export default Header;
