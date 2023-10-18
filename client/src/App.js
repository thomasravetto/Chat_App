import { useState } from 'react';

import LoginAndRegister from './components/authentication/LoginAndRegister';
import './App.css';

function App() {

  const [isActive, setIsActive] = useState(false);

    const handleClick = (event) => {
        setIsActive(current => !current);
    }

  return (
    <div className="App">
      <div className={`container ${isActive ? 'right-panel-active' : ''}`} id='container'>
        <LoginAndRegister handleClick={handleClick}/>
      </div>
    </div>
  );
}

export default App;
