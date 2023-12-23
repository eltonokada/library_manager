// app/javascript/components/application.js

import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './Navigation';

export const UserContext = createContext();

const Application = () => {
  const container = document.getElementById('root');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();  
  }, []);

  const fetchUser = () => {
    const userJson = container.getAttribute('data-user');
    const user = JSON.parse(userJson);
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={currentUser}>
      <Navigation />
    </UserContext.Provider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root')).render(<Application />);
});