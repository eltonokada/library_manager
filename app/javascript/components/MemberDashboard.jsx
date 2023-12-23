import React, { useState, useEffect } from 'react';

function MemberDashboard({ currentUser }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetch('/api/v1/users/' + currentUser.id + '/borrowed_books')
      .then(response => response.json())
      .then(data => {
        setBorrowedBooks(data);
      });
  }, []);

  return (
    <div>
      <h1>My Borrowed Books</h1>
      <p>Total books: {borrowedBooks.length}</p>

        <div>
        <table className="table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Due Date</th>
              <th>Overdue</th>
            </tr>
          </thead>
          <tbody>
          {borrowedBooks.map(book => (
            <tr key={book.id}>
              <td>{book.book_title}</td>
              <td>{book.due_date}</td>
              <td>{book.overdue ? 'Yes' : 'No'}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MemberDashboard;