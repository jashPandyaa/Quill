import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';
import Loader from '../../components/Loader.jsx';

const Dashboard = () => {
    const { blogs } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false); 
    }, [])

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-blue-50/50">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage and view all your blogs</p>
                    </div>
                    <Link
                        to="/admin/addBlog"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center"
                    >
                        Add New Blog
                    </Link>
                </div>

                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Recent Blogs</h2>
                        <Link 
                            to="/admin/listBlog" 
                            className="text-sm text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </div>

                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {blogs.slice(0, 4).map(blog => (
                                <div 
                                    key={blog._id} 
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    {blog.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img 
                                                src={blog.image} 
                                                alt={blog.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                blog.isPublished 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {blog.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                            {blog.subTitle}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                                {blog.category}
                                            </span>
                                            <Link 
                                                to={`/blog/${blog._id}`}
                                                className="text-sm text-primary hover:text-primary-dark font-medium"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
                            <p className="text-gray-500 mb-4">Start creating your first blog post</p>
                            <Link
                                to="/admin/addBlog"
                                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Create First Blog
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">All Blogs</h2>
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {blogs.map(blog => (
                                <div 
                                    key={blog._id} 
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    {blog.image && (
                                        <div className="h-40 overflow-hidden">
                                            <img 
                                                src={blog.image} 
                                                alt={blog.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                blog.isPublished 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {blog.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                                {blog.category}
                                            </span>
                                            <div className="flex space-x-2">
                                                <Link 
                                                    to={`/admin/edit-blog/${blog._id}`}
                                                    className="text-xs text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </Link>
                                                <Link 
                                                    to={`/blog/${blog._id}`}
                                                    className="text-xs text-primary hover:text-primary-dark"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <p className="text-gray-600">No blogs available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;