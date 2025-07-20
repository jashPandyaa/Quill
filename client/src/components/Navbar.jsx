import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const navigate = useNavigate();
  const { backendUrl} = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goHome = () => {
            navigate('/');
        };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
      
      const decoded = JSON.parse(jsonPayload);
      
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        return;
      }
  
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setIsLoggedIn(true);
        setIsAdmin(!decoded.userId); 
        setUserName(userData.user?.name || decoded.name || decoded.email || 'Admin');
        localStorage.setItem('userName', userData.user?.name || decoded.name || decoded.email || 'Admin');
      } else {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    checkAuthStatus();
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className='flex items-center gap-2'>
    <img 
      onClick={goHome} 
      src="/favicon.svg" 
      alt="Quill Logo" 
      className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer" 
    />
    <h1 
      onClick={goHome} 
      className='text-xl sm:text-3xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer'
    >
      Quill
    </h1>
  </div> 
          <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              
              {isLoggedIn ? (
                <>
                  <span className="text-gray-600">Welcome, {userName}</span>
                  <Link 
                    to={isAdmin ? "/admin" : "/dashboard"} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link to="/user/blogs" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Blogs
                </Link>
                
                {isLoggedIn ? (
                  <>
                    <span className="text-gray-600">Welcome, {userName}</span>
                    <Link 
                      to={isAdmin ? "/admin" : "/dashboard"} 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => openAuthModal('login')}
                      className="text-gray-700 hover:text-blue-600 transition-colors text-left"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => openAuthModal('signup')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onModeChange={setAuthMode}
        />
      )}
    </>
  );
};

export default Navbar;