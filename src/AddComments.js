import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

const AddComments = () => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [userid, setUserId] = useState('');

  // Fetch userId and jwt token from local storage and update the state
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    const jwtTokenFromStorage = localStorage.getItem('jwtToken');
    setUserId(userIdFromStorage || '');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;
  }, []);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the userid exists before creating the comment
    axios
      .get(`http://localhost:8000/users/${userid}`)
      .then((response) => {
        // If the user exists, proceed to create the comment
        // Create a comment object with the form data
        const comment = {
          subject: subject,
          text: text,
          userid: userid,
        };
        console.log("User ID:", userid);
        // Make a POST request to create a new comment
        axios
          .post('http://localhost:8001/comments/', comment)
          .then((response) => {
            // Handle the response here if needed
            console.log('Comment created successfully:', response.data);
            // Clear the form fields after successful submission
            setSubject('');
            setText('');
            setUserId('');
          })
          .catch((error) => {
            console.error('Error creating comment:', error);
            // Handle errors, e.g., show an error message to the user
          });
      })
      .catch((error) => {
        // If the user does not exist, display an error message or take appropriate action
        console.error('Error:', error);
        console.log('User not found!');
      });
  };
  

  return (
    <>
      <Dashboard />

      <div className="container mt-5">
        <h2 className="mb-3">Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject:</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Text:</label>
            <input
              type="text"
              id="text"
              className="form-control"
              value={text}
              onChange={handleTextChange}
              required
            />
          </div>
          {/* The userid field is now read-only, automatically populated from local storage */}
          <div className="mb-3">
            <label htmlFor="userid" className="form-label">User ID:</label>
            <input
              type="text"
              id="userid"
              className="form-control"
              value={userid}
              readOnly // Make the userid field read-only
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </>
  );
};

export default AddComments;
