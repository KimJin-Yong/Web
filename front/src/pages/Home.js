import React from "react";
import UploadForm from './components/UploadForm';
import ImageReturn from './components/ImageReturn';

const Main = () => {
  return (
    <React.Fragment>
      <div className='main'>
        <UploadForm />
        <ul className='horizontal-list'>
          <li><ImageReturn /></li>
          <li><ImageReturn /></li>
          <li><ImageReturn /></li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Main;
