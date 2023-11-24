import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import LoginAndRegister from './components/authentication/LoginAndRegister';
import Home from './components/homepage/Home';
import './App.css';
import Loader from './components/loader/Loader';
import UserProfile from './components/user_profile/UserProfile';

import socket from 'socket.io-client';

const API_URL = 'https://5zx5qp51-3500.euw.devtunnels.ms/v1/'; //change to localhost

const io = socket.connect('https://5zx5qp51-3500.euw.devtunnels.ms/');

function App() {


  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);  // CHANGE BACK TO FALSE
  const [userId, setId] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [sessionChecked, setSessionChecked] = useState(false); // change back to false

  const changePanel = (event) => {
        setIsActive(current => !current);
    };

  function loadUser (user, callback) {
    setId(user.id);
    setUsername(user.username)
    setEmail(user.email)
    setAuthenticated(true);
    if (callback) {
      callback();
    }
  }

  async function sessionChecker () {
    try {
      const resp = await fetch(API_URL + '/check_session');

      if (resp.ok) {
        const data = await resp.json();
        return data;
      } else {
        console.error('Error checking session:', resp.status);
        return { isAuthenticated: false };
      }

    } catch (error) {
      console.error('Error checking session:', error);
      return { isAuthenticated: false };
    }
  }

  useEffect(() => {
    async function handleSessionChecker () {
      const sessionStatus = await sessionChecker();
      if (sessionStatus.isAuthenticated) {
        setAuthenticated(true);
        setId(sessionStatus.id);
        setUsername(sessionStatus.username);
        setEmail(sessionStatus.email);
      }
      setSessionChecked(true);
    }

    handleSessionChecker();
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/authentication' element={
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id='container'>
                <LoginAndRegister changePanel={changePanel} loadUser={loadUser} API_URL={API_URL}/>
            </div>
          } />
          <Route path='/' element={
            !sessionChecked ?
              <Loader/> :
              isAuthenticated ?
                <Home userId={userId} username={username} email={email} io={io} API_URL={API_URL}/> :
                <Navigate replace to={'/authentication'}/>
          }/>
          <Route path='/profile' element={<UserProfile id={userId} API_URL={API_URL}/>}/>
          <Route path='/auth/failure' element={<div>Failure</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
