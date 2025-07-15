import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    // Fix: Use req.headers.authorization (not req.header.authorization)
    const token = req.headers.authorization?.split(' ')[1]; // Get token after "Bearer"
    
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid token!" });
    }
}

export default auth;