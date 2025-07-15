import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar.jsx';
import Moment from "moment";
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            if (data.success) {
                setData(data.blog);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}/comments`);
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (!name || !content) {
            toast.error('Please enter your name and comment');
            return;
        }

        try {
            const { data } = await axios.post('/api/blog/add-comment', { 
                blog: id, 
                name, 
                content 
            });
            
            if (data.success) {
                toast.success('Comment added successfully');
                setName('');
                setContent('');
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, [id]);

    if (!data) return <Loader />;

    return (
        <div className='relative'>
            <img src={assets.gradientBackground} alt="background" className='absolute -top-50 -z-1 opacity-50' />
            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>
                    Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                </p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {data.title}
                </h1>
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                    Admin
                </p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img src={data.image} alt="" className='rounded-3xl mb-5 w-full h-auto max-h-96 object-cover' />
                
                <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

                {/* Comments Section */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <h3 className='text-xl font-semibold mb-6'>Comments ({comments.length})</h3>
                    <div className='flex flex-col gap-4 mb-8'>
                        {comments.map((item, index) => (
                            <div key={index} className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <img src={assets.user_icon} alt="user" className='w-8 h-8' />
                                    <div>
                                        <p className='font-medium'>{item.name}</p>
                                        <p className='text-xs text-gray-500'>
                                            {Moment(item.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                                <p className='text-gray-700 pl-11'>{item.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment Form */}
                    <div className='bg-gray-50 p-6 rounded-lg'>
                        <h4 className='font-semibold mb-4'>Leave a Comment</h4>
                        <form onSubmit={addComment} className='space-y-4'>
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Your comment"
                                    className='w-full p-3 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className='bg-primary text-white py-2 px-6 rounded hover:bg-primary-dark transition-colors'
                            >
                                Post Comment
                            </button>
                        </form>
                    </div>
                </div>

                {/* Share Buttons */}
                <div className='my-14 max-w-3xl mx-auto text-center'>
                    <h3 className='font-semibold mb-4'>Share this article</h3>
                    <div className='flex justify-center gap-4'>
                        <button className='p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors'>
                            <img src={assets.facebook_icon} width={24} alt="Facebook" />
                        </button>
                        <button className='p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors'>
                            <img src={assets.twitter_icon} width={24} alt="Twitter" />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;