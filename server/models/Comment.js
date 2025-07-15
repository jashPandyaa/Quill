import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
}, {
    timestamps: true,
    strictPopulate: false
});

// Prevent model overwrite upon recompilation
if (mongoose.models.Comment) {
    delete mongoose.models.Comment;
}

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;