import { useState, useEffect } from 'react';
import './Users.css';

function RenderUsers({onSelect, setCoins}) {
  const [users, setUsers] = useState(null);

  const randomPictures = [
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEy-Hi3lntqni03_IgMHV_6nbWR5sG5EuE11oKCej1YqlHvxzo6lfyF7L_JXrJaoZIkY&usqp=CAU',
    'https://files.startupranking.com/startup/thumb/750214_31d9b50b30ff622b46306861622120d5ed9404a8_namewink_m.png',
    'https://mattermost.com/wp-content/uploads/2021/03/Screenshot_94.png',
    'https://img.freepik.com/premium-vector/funny-green-face-square-avatar-cartoon-emotion-icon_53562-16129.jpg',
    'https://ih1.redbubble.net/image.618410924.2644/flat,750x1000,075,t.u12.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png',
    'https://ih0.redbubble.net/image.618379802.1473/flat,1000x1000,075,f.u2.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzqHCSZxVq2JzIW-V6KGNAPuoWrNie1-wZ7oiQqrsL1lHdkybNEXRpJ-1YfxWqOIA5j6g&usqp=CAU',
    'https://play-lh.googleusercontent.com/SxfjlDFUQx12KFLjg65X6QvM3D7C-dUVUpOnKjyHlKAWpLyp2pkiE0scQb63MW8Ugak',  
]


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

  function handleChoosePlayer(user){
    onSelect(user)
    setCoins(user['coin_balance']);
    console.log('works');
  }

  if (users === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className='proflandwall'>
      <div className="profile-container">
        {users.map((user) => (
          <div className="profile" key={user._id}>
            <label onClick={() => handleChoosePlayer(user)}>
            <img src={randomPictures[Math.floor(Math.random() * randomPictures.length)]} alt="User Profile" style={{ maxWidth: '140px' }}></img>
            </label>
            <br />
           {/*  <label> 
              Username:
              <h4>{user.username}</h4>
            </label> */}
          </div>
        ))}
        <button className="button"> + </button>
      </div>
    </div>
  );

}

export default RenderUsers;
