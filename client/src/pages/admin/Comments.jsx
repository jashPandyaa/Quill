import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true); // Start with loading true
  const { axios, token } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (data.success) {
        // Transform data to ensure consistent structure
        const safeComments = data.comments.map(c => ({
          ...c,
          // Handle all possible cases of blog data
          blogTitle: c.blog?.title || c.blogTitle || '[Blog Not Found]',
          isApproved: c.isApproved || false
        }));
        setComments(safeComments);
      } else {
        toast.error(data.message);
        setComments([]); // Reset to empty array on failure
      }
    } catch (error) {
      console.error("Comments Error:", error);
      toast.error("Failed to load comments");
      setComments([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (commentId) => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", 
        { id: commentId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const { data } = await axios.post("/api/admin/delete-comment",
        { id: commentId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed");
    }
  };

  useEffect(() => { 
    fetchComments();
  }, []);

  const filteredComments = comments.filter(comment => 
    filter === "Approved" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className='flex-1 mt-4 pt-5 px-5 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl mb-6'>
        <h1 className='text-xl font-semibold'>Comments Management</h1>
        <div className='flex gap-2'>
          <button 
            onClick={() => setFilter('Approved')}
            className={`px-4 py-1 cursor-pointer rounded-full text-xs border ${
              filter === 'Approved' ? 'bg-primary text-white border-primary' : 'bg-white'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`px-4 py-1 cursor-pointer rounded-full text-xs border ${
              filter === 'Not Approved' ? 'bg-primary text-white border-primary' : 'bg-white'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">No {filter.toLowerCase()} comments found</p>
          <button 
            onClick={fetchComments}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Refresh Comments
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComments.map(comment => (
                <tr key={comment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{comment.blogTitle}</p>
                    <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                    <p className="text-xs text-gray-500 mt-1">- {comment.name}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleApprove(comment._id)}
                      className={`px-3 py-1 text-xs rounded ${
                        comment.isApproved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      } cursor-pointer`}
                    >
                      {comment.isApproved ? 'Approved' : 'Approve'}   
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comments;