import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { setToken, navigate } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isAdminLogin ? '/api/admin/login' : '/api/auth/login';
            const { data } = await axios.post(endpoint, { email, password });
            
            if (data.token) {
                setToken(data.token, data.user);
                if (isAdminLogin) {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
                toast.success(`Welcome back, ${data.user?.name || 'Admin'}!`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        {isAdminLogin ? 'Admin Login' : 'User Login'}
                    </h1>
                    <p className="text-gray-600">
                        Enter your credentials to {isAdminLogin ? 'access the admin panel' : 'continue'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center text-sm">
                    {isAdminLogin ? (
                        <>
                            <p>Not an admin? <button onClick={() => setIsAdminLogin(false)} className="text-primary">User Login</button></p>
                            <p>Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
                        </>
                    ) : (
                        <>
                            <p>Admin? <button onClick={() => setIsAdminLogin(true)} className="text-primary">Admin Login</button></p>
                            <p>Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;