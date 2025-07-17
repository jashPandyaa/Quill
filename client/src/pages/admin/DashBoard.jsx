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
        <div>
            <div className="container mx-auto p-4 md:p-8">
                <br></br>
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-semibold">All Blogs</h2>
                        <Link
                            to="/admin/addBlog"
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                        >
                            Add New Blog
                        </Link>
                    </div>

                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map(blog => (
                                <div key={blog._id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className=" text-lg">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className={`text-sm ${
                                        blog.isPublished ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                        {blog.isPublished ? 'Published' : 'Draft'}
                                    </p>
                                    <Link 
                                        to={`/blog/${blog._id}`}
                                        className="text-primary text-sm mt-2 inline-block"
                                    >
                                        View Blog
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <p className="text-gray-600">You haven't written any blogs yet.</p>
                            <Link
                                to="/add-blog"
                                className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                            >
                                Write Your First Blog
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;