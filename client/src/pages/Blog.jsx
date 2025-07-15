import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from "moment";
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
    const { id } = useParams();
    const { axios, user, token } = useAppContext();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            if (data.success) {
                setData(data.blog);
                setLikeCount(data.blog.likes?.length || 0);
                if (user) {
                    setIsLiked(data.blog.likes?.includes(user._id) || false);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id });
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
        if (!token) {
            toast.error('Please login to add comments');
            return;
        }

        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name: user.name, content });
            if (data.success) {
                toast.success(data.message);
                setContent('');
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleLike = async () => {
        if (!token) {
            toast.error('Please login to like blogs');
            return;
        }

        try {
            const { data } = await axios.post(`/api/blog/${id}/like`);
            if (data.success) {
                setLikeCount(data.likesCount);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to like blog");
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, [id]);

    if (!data) return <Loader />;

    return (
        <div className='relative'>
            <img src={assets.gradientBackground} alt="background color" className='absolute -top-50 -z-1 opacity-50' />
            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>
                    Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                </p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {data.title}
                </h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.title}</h2>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <p className='inline-block py-1 px-4 rounded-full border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                        {data.author?.name || 'Unknown Author'}
                    </p>
                    <button 
                        onClick={handleLike}
                        className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {likeCount}
                    </button>
                </div>
            </div>

            {/* Blog Main Content */}
            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img src={data.image} alt="" className='rounded-3xl mb-5' />
                
                <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

                {/* Comments Section */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='mb-4 font-semibold'>Comments ({comments.length})</p>
                    <div className='flex flex-col gap-4'>
                        {comments.map((item, index) => (
                            <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <img src={assets.user_icon} alt="usericon" className='w-6' />
                                    <p className='font-medium'>{item.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                                    {Moment(item.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Add your comment</p>
                    <form className='flex flex-col items-start gap-4 max-w-lg' onSubmit={addComment}>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder='Comment'
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                            required
                        ></textarea>
                        <button
                            type='submit'
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share Buttons */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <img src={assets.facebook_icon} width={50} alt="Facebook" />
                        <img src={assets.twitter_icon} width={50} alt="Twitter" />
                        <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
