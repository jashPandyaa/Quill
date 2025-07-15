import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog', // Must be lowercase to match your Blog model
        required: true
    },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
}, {
    timestamps: true,
    strictPopulate: false // This bypasses schema validation
});

// Add this critical line to prevent model recompilation issues
if (mongoose.models.Comment) {
    delete mongoose.models.Comment;
}

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;