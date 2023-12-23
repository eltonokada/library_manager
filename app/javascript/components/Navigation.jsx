import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookForm from './BookForm';
import Dashboard from './Dashboard';
import BookApp from './BookApp';

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  useEffect(() => {
    const node = document.getElementById('root');
    const data = JSON.parse(node.getAttribute('data-user'));

    setCurrentUser(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const handleLogout = () => {
    fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      credentials: 'same-origin'
    }).then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <Router>
        <header className="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top bg-light bg-gradient">
          <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
            <span className="fs-4"><h1>library manager</h1></span>

            <ul className="nav nav-pills">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">List Books</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  {currentUser.role === 'librarian' && (
                    <li className="nav-item">
                      <Link to="/add-book" className="nav-link">Add Book</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                  </li>
                </>
                ) : 
                (
                <>
                  <li className="nav-item">
                    <a href="/users/sign_in" className="nav-link">Signin</a>
                  </li>
                  <li className="nav-item">
                    <a href="/users/sign_up" className="nav-link">Signup</a>
                  </li>
                </>
                )
              }
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
          <Route path="/" element={<BookApp currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          {currentUser && currentUser.role === 'librarian' && (
            <>
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/edit-book/:id" element={<BookForm mode="edit" />} />
            </>
          )}
        </Routes>
    </Router>
  );
};

export default Navigation;