import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const UserAddBlog = () => {
    const { axios, token, user } = useAppContext();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async () => {
        if (!title) return toast.error('Please enter a title');

        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title });
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsAdding(true);

        if (!image) {
            toast.error("Please upload a thumbnail image");
            return;
        }

        try {
            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished
            };

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            formData.append('image', image);

            const { data } = await axios.post('/api/blog/add', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Create New Blog</h1>
                
                <form onSubmit={onSubmitHandler} className="bg-white w-full max-w-3xl p-4 md:p-6 shadow rounded">
                    {/* Form fields same as your AddBlog component */}
                    {/* ... */}
                    
                    <div className="mt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={isAdding}
                            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
                        >
                            {isAdding ? 'Publishing...' : 'Publish Blog'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsPublished(false);
                                onSubmitHandler(e);
                            }}
                            disabled={isAdding}
                            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            {isAdding ? 'Saving...' : 'Save as Draft'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UserAddBlog;