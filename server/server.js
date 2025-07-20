import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

await connectDB();

// MiddleWares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://quill-mu-one.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get("/" , (req,res) => {
    res.send("Home route Working!");
})

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

const PORT = 5000;

app.listen(PORT , () => {
    console.log("Server is running on Port",PORT);
})

export default app;