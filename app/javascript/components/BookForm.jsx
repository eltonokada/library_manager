// BookForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from './application';

  const BookForm = ({ book: bookProp }) => {
    const currentUser = useContext(UserContext);
    const location = useLocation();
    const book = location.state?.book || bookProp;

    const [formData, setFormData] = useState({
      title: '',
      author: '',
      genre: '',
      isbn: '',
      total_copies: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      if (book) {
        const { created_at, updated_at, id, ...bookData } = book;
        for (let key in bookData) {
          if (bookData[key] === null) {
            bookData[key] = '';
          }
        }
        setFormData(bookData);
      }
    }, [book]);

    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
      e.preventDefault();
    
      const csrfToken = document.querySelector("[name='csrf-token']").content;
      
      const url = book
        ? `http://127.0.0.1:3000/api/v1/books/${book.id}`
        : 'http://127.0.0.1:3000/api/v1/books';
      
      const method = book ? 'PUT' : 'POST';

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'Authorization': `${currentUser.token}`
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response text:', response.statusText);
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    return (
      <div className="container col-3"> 
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>ISBN:</label>
            <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Total Copies:</label>
            <input
              type="number"
              name="total_copies"
              value={formData.total_copies}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">{book ? 'Update' : 'Add'} Book</button>
        </form>
      </div>
    );
};

export default BookForm;
