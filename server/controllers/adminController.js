import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js';
import Comment from '../models/Comment.js';

export const adminLogin = async (req,res) =>{
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({ success: false, message : "Invalid credential"})
        }

        const token = jwt.sign( {email} , process.env.JWT_SECRET);
        res.json({success : true , token});
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export const getAllBlogAdmin = async (req,res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success : true , blogs});
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export const getAllComments = async (req, res) => {
    try {
        let comments = await Comment.find({})
            .lean()
            .exec();
        
        if (!comments[0]?.blog?.title) {
            const blogIds = comments.map(c => c.blog).filter(id => id);
            const blogs = await Blog.find({ _id: { $in: blogIds } })
                .select('title')
                .lean();
            
            const blogMap = {};
            blogs.forEach(blog => {
                blogMap[blog._id.toString()] = blog;
            });
            
            comments = comments.map(comment => ({
                ...comment,
                blog: blogMap[comment.blog] || null,
                blogTitle: blogMap[comment.blog]?.title || '[Removed Blog]'
            }));
        }

        return res.json({ 
            success: true, 
            comments 
        });
        
    } catch (error) {
        console.error('Comments Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to load comments'
        });
    }
}

export const getDashboard = async (req,res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt : -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments( {isPublished: false} );

        const dashboardData = {
            blogs , comments , drafts , recentBlogs
        }
        res.json({success : true , dashboardData});
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export const deleteCommentById = async (req,res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success : true , message : "Comment Deleted successfully!" });
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export const approveCommentById = async (req,res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id , {isApproved : true});
        res.json({ success : true , message : "Comment Approved successfully!" });
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}