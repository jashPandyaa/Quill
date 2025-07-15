// client/src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import DashBoard from './pages/admin/DashBoard';
import AddBlog from './pages/admin/AddBlog';
import ListBlog from './pages/admin/ListBlog';
import Comments from './pages/admin/Comments';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './pages/Dashboard';
import UserAddBlog from './pages/UserAddBlog';
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import { ProtectedRoute, UserRoute } from './components/ProtectedRoute';

const App = () => {
    const { token, user } = useAppContext();

    return (
        <div>
            <Toaster />
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/blog/:id' element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* User Routes */}
                <Route path="/dashboard" element={
                    <UserRoute>
                        <DashBoard />
                    </UserRoute>
                } />
                <Route path="/add-blog" element={
                    <UserRoute>
                        <UserAddBlog />
                    </UserRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        {token ? <Layout /> : <Login />}
                    </ProtectedRoute>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path='addBlog' element={<AddBlog />} />
                    <Route path='listBlog' element={<ListBlog />} />
                    <Route path='comments' element={<Comments />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;