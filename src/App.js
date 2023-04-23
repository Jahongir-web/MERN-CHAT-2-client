
import { useState } from 'react';
import './App.css';
import { Auth } from './pages/Auth/Auth';
import { Chat } from './pages/Chat/Chat';


function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null);
  
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      {currentUser ? (
          <Chat currentUser={currentUser} setCurrentUser={setCurrentUser} />
        ) : (
          <Auth handleLogin={handleLogin} />
        )
      }

      <div className='blur'></div>
      <div className='blur'></div>
    </div>
  );
}

export default App;
