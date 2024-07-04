import React from 'react';
import { SidebarButton } from "@/components/SidebarButton";
import { MdComment } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { RiContactsBook2Fill } from "react-icons/ri";

const Sidebar = () => {
    return (
        <aside className="h-full w-6 md:min-w-20 2xl:w-28 2xl:min-w-28 overflow-hidden fixed z-10 pt-5 bg-white top-14 hidden md:block">
            <div className="p-3">
                <h2 className="mb-4 text-sm text-center tracking-tight">Menu</h2>
                <div className="w-full text-center">
                    <div>
                        <SidebarButton icon={<GoHomeFill />} tooltipText="Home" href="/" />
                    </div>
                    <div>
                        <SidebarButton icon={<RiContactsBook2Fill />} tooltipText="Contact" href="/contact" />
                    </div>

                </div>


            </div>
        </aside>
    );
};

export default Sidebar;
