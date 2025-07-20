import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import AdminDashBoard from './pages/admin/DashBoard';
import AddBlog from './pages/admin/AddBlog';
import ListBlog from './pages/admin/ListBlog';
import Comments from './pages/admin/Comments';
import Login from './components/admin/Login';
import UserLayout from './pages/user/UserLayout';
import UserBlogList from './pages/user/UserBlogList';
import UserAddBlog from './pages/user/UserAddBlog';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import UserDashboard from './pages/user/DashBoard';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import WriteForUs from './pages/WriteForUs';
import Advertise from './pages/Advertise';

const App = () => {
  const { token } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/write-for-us" element={<WriteForUs />} />
          <Route path="/advertise" element={<Advertise />} />

          <Route path="/admin" element={token ? <Layout /> : <Login />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>

          <Route path="/dashboard" element={<UserDashboard />} />

          <Route 
            path="/user" 
            element={token ? <UserLayout /> : <Navigate to="/" />}
          >
            <Route index element={<UserBlogList />} />
            <Route path="add-blog" element={<UserAddBlog />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;