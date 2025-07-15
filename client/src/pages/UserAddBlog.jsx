// client/src/pages/UserAddBlog.jsx
import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserAddBlog = () => {
    const { axios, token } = useAppContext();
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
                    <div>
                        <p>Upload thumbnail</p>
                        <label htmlFor="image">
                            <img 
                                src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                                alt="thumbnail preview" 
                                className='mt-2 h-16 rounded cursor-pointer'
                            />
                            <input 
                                onChange={(e) => setImage(e.target.files[0])} 
                                type="file" 
                                id="image" 
                                hidden 
                                required 
                            />
                        </label>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Blog Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Sub title</label>
                        <input
                            type="text"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Blog Description</label>
                        <div className="h-64 mt-2 relative">
                            <div ref={editorRef} className="h-full"></div>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                    <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                                </div>
                            )}
                            <button 
                                type="button"
                                onClick={generateContent}
                                disabled={loading}
                                className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
                            >
                                Generate With AI
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">Blog Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        >
                            {blogCategories.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            id="publish"
                            className="scale-125 cursor-pointer"
                        />
                        <label htmlFor="publish" className="cursor-pointer">Publish Now</label>
                    </div>

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