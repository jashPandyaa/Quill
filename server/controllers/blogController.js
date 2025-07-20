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

        const blogData = { 
            title, 
            subTitle, 
            description, 
            category, 
            image, 
            isPublished 
        };

        if (req.user && req.user.userId) {
            blogData.author = req.user.userId;
            blogData.authorName = req.user.name;
        }

        await Blog.create(blogData);
        res.json({success: true, message: "Blog added successfully!"});

    } catch (error) {
        res.json({success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .populate('author', 'name')
            .select('title subTitle description category image isPublished author authorName likesCount createdAt updatedAt')
            .sort({ createdAt: -1 });

        const formattedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            authorName: blog.author?.name || blog.authorName || 'Admin'
        }));

        res.json({ success: true, blogs: formattedBlogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getBlogId = async ( req, res) => {
    try {
        const {blogId } =  req.params;
        const blog = await Blog.findById(blogId).populate('author', 'name');

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
        const { id } = req.body;
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }

        const isAdmin = !req.user.userId;
        const isAuthor = req.user.userId && blog.author && blog.author.toString() === req.user.userId;

        if (!isAdmin && !isAuthor) {
            return res.json({success: false, message: "Unauthorized to delete this blog"});
        }

        await Blog.findByIdAndDelete(id);
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
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }

        const isAdmin = !req.user.userId;
        const isAuthor = req.user.userId && blog.author && blog.author.toString() === req.user.userId;

        if (!isAdmin && !isAuthor) {
            return res.json({success: false, message: "Unauthorized to modify this blog"});
        }

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

export const togglePublishById = async (req, res) => {
    try {
        const { blogId } = req.params;
        
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }

        const isAdmin = !req.user.userId;
        const isAuthor = req.user.userId && blog.author && blog.author.toString() === req.user.userId;

        if (!isAdmin && !isAuthor) {
            return res.json({success: false, message: "Unauthorized to modify this blog"});
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog Status Updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }

        const isAdmin = !req.user.userId; 
        const isAuthor = req.user.userId && blog.author && blog.author.toString() === req.user.userId;

        if (!isAdmin && !isAuthor) {
            return res.json({success: false, message: "Unauthorized to delete this blog"});
        }

        await Blog.findByIdAndDelete(blogId);
        await Comment.deleteMany({ blog: blogId });

        res.json({success: true, message: "Blog deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const toggleLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user?.userId;
        const userName = req.user?.name;

        if (!userId || !userName) {
            return res.json({ success: false, message: "Please login to like blogs" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        const existingLikeIndex = blog.likes.findIndex(like => like.user.toString() === userId);

        if (existingLikeIndex !== -1) {
            blog.likes.splice(existingLikeIndex, 1);
            blog.likesCount = Math.max(0, blog.likesCount - 1);
            await blog.save();
            
            res.json({ 
                success: true, 
                message: "Blog unliked", 
                liked: false,
                likesCount: blog.likesCount 
            });
        } else {
            blog.likes.push({ user: userId, userName: userName });
            blog.likesCount = blog.likesCount + 1;
            await blog.save();
            
            res.json({ 
                success: true, 
                message: "Blog liked", 
                liked: true,
                likesCount: blog.likesCount 
            });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogLikes = async (req, res) => {
    try {
        const { blogId } = req.params;
        
        const blog = await Blog.findById(blogId)
            .select('likes likesCount')
            .populate('likes.user', 'name');

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        res.json({ 
            success: true, 
            likes: blog.likes,
            likesCount: blog.likesCount 
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const checkUserLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.json({ success: true, liked: false, likesCount: 0 });
        }

        const blog = await Blog.findById(blogId).select('likes likesCount');
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        const isLiked = blog.likes.some(like => like.user.toString() === userId);
        
        res.json({ 
            success: true, 
            liked: isLiked,
            likesCount: blog.likesCount 
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};