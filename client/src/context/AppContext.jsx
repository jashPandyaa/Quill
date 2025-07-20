import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.baseURL = BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null); 
    const [blogs, setBlogs] = useState([]); 
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const config = token ? {} : { headers: { Authorization: undefined }};
            const { data } = await axios.get('/api/blog/all', config);
            
            if (data?.success) {
                setBlogs(data.blogs || []);
            } else {
                throw new Error(data?.message || "Failed to load blogs");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const initializeAuth = (token, userData = null) => {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token); 
          if (userData) setUser(userData);
        } else {
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('token');
          setUser(null);
        }
      };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        fetchBlogs();
    }, []);

    const value = {
        axios,
        navigate,
        token,
        user,
        setToken: (newToken, userData) => {
            setToken(newToken);
            initializeAuth(newToken, userData);
            if (newToken) {
                localStorage.setItem('token', newToken);
                if (userData) localStorage.setItem('user', JSON.stringify(userData));
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        blogs,
        setBlogs,
        input,
        setInput,
        backendUrl: BACKEND_URL,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
    
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;