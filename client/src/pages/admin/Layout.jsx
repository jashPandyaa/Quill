import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    const { navigate, setToken } = useAppContext();

    const logout = () => {
        setToken(null); // This now handles all cleanup
        navigate("/");
    };

    return (
        <>
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                    <img 
                        onClick={() => navigate('/')} 
                        src="/favicon.svg" 
                        alt="Quill Logo" 
                        className="w-8 h-8 cursor-pointer" 
                    />
                    <h1 
                        onClick={() => navigate('/')} 
                        className='text-3xl font-semibold text-black cursor-pointer'
                    >
                        Quill
                    </h1>
                </div>    
                <button 
                    onClick={logout} 
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary-dark transition'
                >
                    Logout
                </button>
            </div>

            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>  
        </>
    );
};

export default Layout;