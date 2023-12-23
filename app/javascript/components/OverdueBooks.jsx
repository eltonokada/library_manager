// Books.jsx
import React, { useState, useEffect } from 'react';
import ReturnButton from './ReturnButton';

function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState([]);

  useEffect(() => {
    fetch('/api/v1/borrowings/overdue_books')
      .then(response => response.json())
      .then(data => {
        setOverdueBooks(data);
      });
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan="2"><p>Overdue books: {overdueBooks.length}</p></th>
          </tr>
        </thead>
        <tbody>
        {overdueBooks.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td><ReturnButton bookId={book.id}/></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default OverdueBooks;