import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.baseURL = BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setTokenState] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const config = token ? {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            } : {};
            
            const { data } = await axios.get('/api/blog/all', config);
                         
            if (data?.success) {
                setBlogs(data.blogs || []);
            } else {
                throw new Error(data?.message || "Failed to load blogs");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setBlogs([]);
        }
    };

    const setToken = (newToken, userData = null) => {
        setTokenState(newToken);
        
        if (newToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            localStorage.setItem('token', newToken);
            
            if (userData) {
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userName');
            setUser(null);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken) {
            try {
                const base64Url = storedToken.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    window.atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')
                );
                
                const decoded = JSON.parse(jsonPayload);
                
                if (decoded.exp * 1000 > Date.now()) {
                    setTokenState(storedToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    
                    if (storedUser) {
                        try {
                            setUser(JSON.parse(storedUser));
                        } catch (e) {
                            console.error('Error parsing stored user:', e);
                        }
                    }
                } else {
                    setToken(null);
                }
            } catch (error) {
                console.error('Error checking stored token:', error);
                setToken(null);
            }
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (token !== null) {
            fetchBlogs();
        }
    }, [token]);

    const value = {
        axios,
        navigate,
        token,
        user,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        backendUrl: BACKEND_URL,
        fetchBlogs
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;