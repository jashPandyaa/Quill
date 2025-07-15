import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "No token provided" 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ 
            success: false, 
            message: "Invalid token!" 
        });
    }
}

// Admin middleware
const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "Not authorized as admin" 
        });
    }
    next();
}

export { auth, admin };