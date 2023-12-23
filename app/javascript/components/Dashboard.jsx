import React, { useState, useEffect } from 'react';
import BorrowedBooks from './BorrowedBooks';
import OverdueBooks from './OverdueBooks';
import OverdueMembers from './OverdueMembers';
import MemberDashboard from './MemberDashboard';

function Dashboard({ currentUser}) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/v1/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      });
  }, []);

  return (
    <div className="container">
      {currentUser.role === 'librarian' ? (
        <>
        <h3>dashboard</h3>
        <p>Total books: {books.length}</p>
        <BorrowedBooks />
        <OverdueBooks />
        <OverdueMembers />
      </>
      ) : (
        <MemberDashboard currentUser={currentUser} />
      )}
    </div>
  );
}

export default Dashboard;