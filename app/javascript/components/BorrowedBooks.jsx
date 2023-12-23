// Books.jsx
import React, { useState, useEffect } from 'react';
import ReturnButton from './ReturnButton';

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetch('/api/v1/borrowings/borrowed_books')
      .then(response => response.json())
      .then(data => {
        setBorrowedBooks(data);
      });
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan="2"><p>Borrowed books: {borrowedBooks.length}</p></th>
          </tr>
        </thead>
        <tbody>
        {borrowedBooks.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td><ReturnButton bookId={book.id} /></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowedBooks;