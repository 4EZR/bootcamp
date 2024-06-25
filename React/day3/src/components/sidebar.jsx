import React from 'react';
import { Button } from '@/components/ui/button';
import { ComboboxDemo } from '@/components/ui/combobox';

const Sidebar = () => {
    return (
        <aside className="flex justify-between items-center p-4 bg-white/55 text-gray-800 border-b-[1px] border-gray-200 fixed top-0 w-screen backdrop-blur-lg">
            <h1 className="text-xl font-medium lowercase">Pengembangan Sistem</h1>
            <div className='flex gap-5'>
                <ComboboxDemo />
                <Button>Login</Button>
            </div>
        </aside>
    );
};

export default sidebar;
