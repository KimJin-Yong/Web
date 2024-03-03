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
    <div className="card">
      <img src={props.url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.price}</p>
        <a href="/" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}

function App() {
  const [showNav, setShowNav] = useState(true)
  return (
    <div className="App">
      <GiHamburgerMenu className='menu' onClick={() => setShowNav(!showNav)} />
      <NavBar show={showNav} />
      <div className='main' >
        <UploadForm className='search-box'/>

        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
        <Item name='Galaxy S 24' price='120만원' url='https://images.samsung.com/sec/smartphones/galaxy-s24/images/galaxy-s24-highlights-comparison-mo.jpg?imbypass=true'/>
      </div>
    </div>
  );
}

export default App;
