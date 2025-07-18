import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const { title, subTitle, description, category, image, _id } = blog;
    const navigate = useNavigate();

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
            </div>
        </div>
    )
}

export default BlogCard