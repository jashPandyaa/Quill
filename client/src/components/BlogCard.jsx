import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const BlogCard = ({ blog }) => {
    const { title, subTitle, description, category, image, _id, likesCount: initialLikesCount = 0 } = blog;
    const navigate = useNavigate();
    
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();

    useEffect(() => {
        checkUserLike();
    }, [_id, token]);

    const checkUserLike = async () => {
        if (!token) return;
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/blog/${_id}/check-like`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                console.error('Response not ok:', response.status, response.statusText);
                return;
            }
            
            const data = await response.json();
            
            if (data.success) {
                setLiked(data.liked);
                setLikesCount(data.likesCount);
            }
        } catch (error) {
            console.error('Error checking like status:', error);
        }
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        
        if (!token) {
            alert('Please login to like blogs');
            return;
        }

        if (loading) return;
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/blog/${_id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                console.error('Response not ok:', response.status, response.statusText);
                alert('Failed to update like status');
                return;
            }
            
            const data = await response.json();
            
            if (data.success) {
                setLiked(data.liked);
                setLikesCount(data.likesCount);
            } else {
                alert(data.message || 'Failed to update like status');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            alert('Failed to update like status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={() => navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
            <img src={image} alt="blog cover" className='aspect-video object-cover'/>
            <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>
                {category}
            </span>
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900 line-clamp-2'>{title}</h5>
                <h5 className='mb-2 font-small text-gray-600 line-clamp-3'>{subTitle}</h5>
                <p className='mb-3 text-xs text-black-400 line-clamp-1' dangerouslySetInnerHTML={{__html: description}}></p>
                
                {/* Like Button */}
                <div className="flex items-center gap-2 mt-3">
                    <button
                        onClick={handleLike}
                        disabled={loading}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                            liked 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <svg 
                            className={`w-4 h-4 ${liked ? 'fill-current' : 'stroke-current fill-none'}`}
                            viewBox="0 0 24 24" 
                            strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {likesCount}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;