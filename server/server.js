import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB();

// MiddleWares
app.use(cors({
    origin: [
      'http://localhost:5173',       // Dev
      'https://quill-mu-one.vercel.app'  // Production
    ],
    credentials: true
  }));
app.use(express.json());

// Routes
app.get("/" , (req,res) => {
    res.send("Home route Working!");
})

app.use("/api/admin" , adminRouter);
app.use("/api/blog" , blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log("Server is running on Port",PORT);
})

export default app;