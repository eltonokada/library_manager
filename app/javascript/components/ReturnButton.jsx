import React, { useState, useContext } from 'react';
import { UserContext } from './application';

function ReturnButton({ bookId }) {
  const [isClicked, setIsClicked] = useState(false);
  const currentUser = useContext(UserContext);
  function handleClick() {
    setIsClicked(true);

    const csrfToken = document.querySelector("[name='csrf-token']").content;
  
    fetch(`http://127.0.0.1:3000/api/v1/books/${bookId}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Authorization': `${currentUser.token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsClicked(false);
    });
  }

  return (
    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClick} disabled={isClicked}>Mark as Returned</button>
  );
}

export default ReturnButton;