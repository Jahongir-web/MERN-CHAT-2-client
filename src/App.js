
import { useState } from 'react';
import './App.css';
import { Auth } from './pages/Auth/Auth';
import { Chat } from './pages/Chat/Chat';
import { useInfoContext } from './context/Context';


function App() {
  const {currentUser} = useInfoContext()
  
  return (
    <div className="App">
      {currentUser ? (
          <Chat/>
        ) : (
          <Auth/>
        )
      }

      <div className='blur'></div>
      <div className='blur'></div>
    </div>
  );
}

export default App;
