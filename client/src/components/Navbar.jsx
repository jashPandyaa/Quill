import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
    const { navigate, token, setToken } = useAppContext();

    const handleLogin = () => {
        navigate('/admin');
    };

    const handleLogout = () => {
        setToken(null);
        navigate('/');
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
  <div className='flex items-center gap-2'>
    <img 
      onClick={goHome} 
      src="/favicon.svg" 
      alt="Quill Logo" 
      className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer" 
    />
    <h1 
      onClick={goHome} 
      className='text-xl sm:text-3xl font-semibold text-black cursor-pointer'
    >
      Quill
    </h1>
  </div> 

  <div className='flex items-center gap-2 sm:gap-4'>
    {token && (
      <button
        onClick={() => navigate('/admin')}
        className='px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
      >
        Dashboard
      </button>
    )}

    <button 
      onClick={token ? handleLogout : handleLogin}
      className='flex items-center gap-1 sm:gap-2 rounded-full text-xs sm:text-sm cursor-pointer bg-primary text-white px-3 py-1.5 sm:px-6 sm:py-2.5'
    >
      {token ? 'Logout' : 'Admin Login'}
      <img src={assets.arrow} className='w-2 sm:w-3' alt="arrow" />
    </button>
  </div>
</div>
    );
};

export default Navbar;