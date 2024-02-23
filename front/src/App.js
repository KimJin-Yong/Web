import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import ImageReturn from './components/ImageReturn';

import NavBar from './components/NavBar';
import UploadForm from './components/UploadForm';

function Item(props) {
  return (
    <div class="card">
      <img src={props.url} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">{props.price}</p>
        <a href="/" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}

function App() {
  const [showNav, setShowNav] = useState(true)
  return (
    <div className="App">
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
      </header>
      <NavBar show={showNav} />
      <div className='main'>
        <UploadForm className='search-box'/>

        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
      </div>
    </div>
  );
}

export default App;
