import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const UserSidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 w-16 md:w-64 transition-all duration-300'>
      <NavLink 
        end={true} 
        to="/user" 
        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : "hover:bg-gray-50"}`}
      >
        <img src={assets.home_icon} alt="dashboard" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>My Blogs</p>
      </NavLink>


      <NavLink 
        to="/user/add-blog" 
        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${isActive ? "bg-primary/10 border-r-4 border-primary" : "hover:bg-gray-50"}`}
      >
        <img src={assets.add_icon} alt="add blog" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Add New Blog</p>
      </NavLink>
    </div>
  );
};

export default UserSidebar;