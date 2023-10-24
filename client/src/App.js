import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LoginAndRegister from './components/authentication/LoginAndRegister';
import Home from './components/homepage/Home';
import './App.css';

function App() {

  const API_URL = 'https://localhost:3500/v1';

  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const changePanel = (event) => {
        setIsActive(current => !current);
    };

  function loadUser (user, callback) {
    setUsername(user.username)
    setEmail(user.email)
    setAuthenticated(true);
    if (callback) {
      callback();
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/authentication' element={
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id='container'>
                <LoginAndRegister changePanel={changePanel} loadUser={loadUser}/>
            </div>
          } />
          <Route path='/' element={
          isAuthenticated ? <Home username={username} email={email}/>
          : <Navigate replace to={'/authentication'}/>}/>
          <Route path='/auth/failure' element={<div>Failure</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
