import express from 'express';
import { 
    addBlog, addComment, deleteBlogId, generateContent, 
    getAllBlogs, getBlogComments, getBlogId, togglePublish,
    getUserBlogs, toggleLike
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import { auth } from '../middleware/auth.js';

const blogRouter = express.Router();

// Public routes
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogId);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

// Protected routes
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogId);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/generate", auth, generateContent);
blogRouter.get("/user/blogs", auth, getUserBlogs);
blogRouter.post("/:id/like", auth, toggleLike);

export default blogRouter;