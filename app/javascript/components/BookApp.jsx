// BookApp.jsx

import React, { useState, useEffect } from 'react';
import BookForm from './BookForm';
import BookList from './BookList';
import { Routes, Route, useNavigate } from 'react-router-dom';

function BookApp({ currentUser, setCurrentUser }) {
  const [editingBook, setEditingBook] = useState(null);

  const navigate = useNavigate();
    
  const handleEditBook = (book) => {
    setEditingBook(book);
    navigate(`/edit-book/${book.id}`, { state: { book } });
  };

  useEffect(() => {
    if (currentUser === null) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <>
    <div className="container">
      <Routes>
        <Route path="/" element={<BookList currentUser={currentUser} onEditBook={handleEditBook} />} />
        <Route path="/edit-book/:id" element={<BookForm book={editingBook} />} />
      </Routes>
    </div>
    </>
  );
}

export default BookApp;