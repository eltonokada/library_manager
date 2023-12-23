// Books.jsx
import React, { useState, useEffect } from 'react';

function OverdueMembers() {
  const [overdueMembers, setOverdueMembers] = useState([]);

  useEffect(() => {
    fetch('/api/v1/borrowings/overdue_members')
      .then(response => response.json())
      .then(data => {
        setOverdueMembers(data);
      });
  }, []);

  return (
    <div>
      <p>Overdue members: {overdueMembers.length}</p>
      <ul>
        {overdueMembers.map(member => (
          <li key={member.id}>{member.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default OverdueMembers;