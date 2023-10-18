import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginAndRegister from './components/authentication/LoginAndRegister';
import './App.css';

function App() {

  const [isActive, setIsActive] = useState(false);

    const changePanel = (event) => {
        setIsActive(current => !current);
    }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/authentication' element={
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id='container'>
                <LoginAndRegister changePanel={changePanel}/>
            </div>
          } />
          <Route path='/' element={<div>Ciao</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
