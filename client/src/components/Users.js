import { useState, useEffect } from 'react';
import './Users.css';

function RenderUsers() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Hiba a felhasználók lekérésekor:', error);
      }
    }
    fetchUsers()
  }, []);

  if (users === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className='proflandwall'>
      <div className="profile-container">
        {users.map((user) => (
          <div className="profile" key={user._id}>
            <label>
            képnek a helye:
            </label>
            <br />
            <label> 
              Username:
              <h4>{user.username}</h4>
            </label>
          </div>
        ))}
        <button className="button"> + </button>
      </div>
    </div>
  );

}

export default RenderUsers;
