import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';

const app = express();

await connectDB();

// Configure CORS properly
const corsOptions = {
  origin: [
    'https://quill-mu-one.vercel.app', // Your frontend URL
    'http://localhost:3000', 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If using cookies/sessions
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Other middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Quill Blog API");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port", PORT);
});

export default app;