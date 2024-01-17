import React from 'react';
import loaderImage from '../../loader.gif'; // Replace with the actual path to your loader image
import './Loader.css'; // Create a separate CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderImage} alt="Loader" className="loader-image" />
    </div>
  );
};

export default Loader;
