import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req,res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"});
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        });

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'},
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({ title, subTitle, description, category, image, isPublished });
        res.json({success: true, message: "Blog added successfully!"});

    } catch (error) {
        res.json({success: false, message: error.message });
    }
}


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogId = async ( req, res) => {
    try {
        const {blogId } =  req.params;
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.json({success:false ,message: "Blog not found"});
        }
        res.json({success:true , blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogId = async ( req, res) => {
    try {
        const { id } =  req.body;
        await Blog.findByIdAndDelete(id);

        // Delete all comments associated with this blog
        await Comment.deleteMany( { blog: id} );

        res.json({success:true , message: "Blog deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const togglePublish = async (req,res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true , message: "Blog Status Updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const addComment = async (req, res) => {
    try {
      const { blog, content, name } = req.body;
      if (!name || !content) {
        return res.status(400).json({ success: false, message: 'Name and content are required' });
      }
      
      await Comment.create({ blog, content, name });
      res.json({ success: true, message: 'Comment added for review' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const getBlogComments = async (req,res) => {
    try {
        const {blogId} = req.body;
        const comments =  await Comment.find({ blog : blogId , isApproved : true }).sort({createdAt : -1});
        res.json({success: true, comments});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const generateContent = async (req,res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success : true , content});
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}