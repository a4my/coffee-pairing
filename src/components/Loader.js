import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle"></div>
        <div className="inner"></div>
        <div className="middle"></div>
        <div className="outer"></div>
        <div className="extra-outer"></div>
      </div>
    </div>
  );
};

export default Loader;