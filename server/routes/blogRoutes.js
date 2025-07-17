import express from 'express'
import { 
    addBlog, addComment, deleteBlogId, 
    generateContent, getAllBlogs, 
    getBlogComments, getBlogId, togglePublish 
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import Blog from '../models/blog.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogId);
blogRouter.post("/delete", auth, deleteBlogId);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;