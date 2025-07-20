import express from 'express'
import { 
    adminLogin, 
    approveCommentById, 
    deleteCommentById, 
    getAllBlogAdmin, 
    getAllComments, 
    getDashboard,
    getAllUsers,
    toggleUserStatus,
    deleteUser
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);


adminRouter.get("/users", auth, getAllUsers);
adminRouter.post("/toggle-user-status", auth, toggleUserStatus);
adminRouter.post("/delete-user", auth, deleteUser);

export default adminRouter;