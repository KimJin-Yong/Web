import './App.css';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'

import NavBar from './components/NavBar';
import UploadForm from './components/UploadForm';
import ImageReturn from './components/ImageReturn';

function App() {
  const [ showNav, setShowNav ] = useState(false)
  return (
    <div className="App">
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
      </header>
      <NavBar show={showNav} />
      <UploadForm />
      <ImageReturn />
    </div>
  );
}
//
export default App;
