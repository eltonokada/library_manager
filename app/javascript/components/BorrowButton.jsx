import React, { useState } from 'react';

function BorrowButton({ currentUser, bookId, borrowed }) {
  const [isClicked, setIsClicked] = useState(false);
  function handleClick() {
    setIsClicked(true);

    const csrfToken = document.querySelector("[name='csrf-token']").content;
  
    fetch(`http://127.0.0.1:3000/api/v1/books/${bookId}/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Authorization': `${currentUser.token}`
      },
      body: JSON.stringify({
        user_id: currentUser.id,
      }),
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
    !borrowed ? (
      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClick} disabled={isClicked}>Borrow</button>
    ) : "borrowed"
  );
}

export default BorrowButton;