import React from 'react';
import './style.css';

const MainContentWrapper = ({ children }) => {
  return (
    <div className="main-content-wrapper">
      {children}
    </div>
  );
};

export default MainContentWrapper;
