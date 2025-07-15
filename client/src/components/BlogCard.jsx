import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id, likes = [], author } = blog;
    const navigate = useNavigate();
    const { user, axios, token } = useAppContext();
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(user ? likes.includes(user._id) : false);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!token) {
            toast.error('Please login to like blogs');
            return;
        }

        try {
            const { data } = await axios.post(`/api/blog/${_id}/like`);
            if (data.success) {
                setLikeCount(data.likesCount);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to like blog");
        }
    };

    return (
        <div onClick={() => navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
            <img src={image} alt="image card" className='aspect-video'/>
            <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'> 
                {category} 
            </span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'> {title} </h5>
                <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{ "__html": description.slice(0,80) }}></p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">By {author?.name || 'Unknown'}</span>
                    <button 
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-xs ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {likeCount}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;