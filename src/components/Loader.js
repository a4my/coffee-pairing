import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
