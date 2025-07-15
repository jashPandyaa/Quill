import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
    const { navigate, token, user, setToken } = useAppContext();

    const handleAuthButtonClick = () => {
        if (token) {
            if (user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        setToken(null);
        navigate('/');
    };

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <div className='flex items-center gap-2'>
                <img onClick={() => navigate('/')} src="/favicon.svg" alt="Quill Logo" className="w-10 h-10 cursor-pointer" />
                <h1 onClick={() => navigate('/')} className='text-3xl font-semibold text-black cursor-pointer'>Quill</h1>
            </div> 
            
            <div className="flex items-center gap-4">
                {token && (
                    <button 
                        onClick={handleLogout}
                        className='text-sm px-4 py-2 rounded-full text-primary border border-primary hover:bg-primary hover:text-white transition'
                    >
                        Logout
                    </button>
                )}
                <button 
                    onClick={handleAuthButtonClick}
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5'
                >
                    {token ? (user?.role === 'admin' ? 'Admin Panel' : 'Dashboard') : 'Login'}
                    <img src={assets.arrow} className='w-3' alt="arrow" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;