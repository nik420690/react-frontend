import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  const handleEdit = (user) => {
    // Toggle edit mode for the selected user
    setEditedUser(user);
  };

  const handleSave = () => {
    // Send a PUT request to the backend to update the user
    axios
      .put(`http://localhost:8000/users/${editedUser.id}`, editedUser)
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // Update the users state to reflect the changes
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
        );
        // Clear the editedUser state and exit edit mode
        setEditedUser(null);
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  const handleCancelEdit = () => {
    // Clear the editedUser state and exit edit mode
    setEditedUser(null);
  };

  useEffect(() => {
    // Fetch users data from the backend when the component mounts
    axios
      .get('http://localhost:8000/users/') // Make a GET request using axios
      .then((response) => setUsers(response.data)) // Extract the data from the response
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the backend
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // After successful deletion, update the users state to remove the deleted user from the list
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleTypeChange = (e) => {
    // Update the type value in the editedUser state when the dropdown selection changes
    setEditedUser({ ...editedUser, type: e.target.value });
  };

  return (
    <>
    <AdminDashboard />
      <div className="container mt-5">
        <h2 className="mb-3">Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editedUser && editedUser.id === user.id ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editedUser && editedUser.id === user.id ? (
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, username: e.target.value })
                      }
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editedUser && editedUser.id === user.id ? (
                    <select
                      value={editedUser.type}
                      onChange={handleTypeChange}
                      className="form-control"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.type
                  )}
                </td>
                <td>
                  {editedUser && editedUser.id === user.id ? (
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
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
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

export default Users;
