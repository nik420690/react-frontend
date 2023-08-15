import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const API_URL = 'https://comment-187a.onrender.com/comments/';

const ShowComments = () => {
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('jwtToken');

  const handleEdit = (comment) => {
    setEditedComment(comment);
  };

  const handleSave = () => {
    axios
      .put(`${API_URL}${editedComment.id}`, editedComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editedComment.id ? response.data : comment
          )
        );
        setEditedComment(null);
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditedComment(null);
  };

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setIsLoading(false);
      });
  }, [token]);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleSubjectChange = (e) => {
    setEditedComment({ ...editedComment, subject: e.target.value });
  };

  const handleTextChange = (e) => {
    setEditedComment({ ...editedComment, text: e.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminDashboard />
      <div className="container mt-5">
        <h2 className="mb-3">Comments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Text</th>
              <th>User ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>
                  {editedComment && editedComment.id === comment.id ? (
                    <input
                      type="text"
                      value={editedComment.subject}
                      onChange={handleSubjectChange}
                    />
                  ) : (
                    comment.subject
                  )}
                </td>
                <td>
                  {editedComment && editedComment.id === comment.id ? (
                    <input
                      type="text"
                      value={editedComment.text}
                      onChange={handleTextChange}
                    />
                  ) : (
                    comment.text
                  )}
                </td>
                <td>{comment.userid}</td>
                <td>
                  {editedComment && editedComment.id === comment.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(comment)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowComments;
