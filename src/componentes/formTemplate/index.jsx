import React from 'react';
import './style.css';

const FormTemplate = ({ children, className, isForm = true, ...props }) => {
  return isForm ? (
    <form className={`form-template ${className}`} {...props}>
      {children}
    </form>
  ) : (
    <div className={`form-template ${className}`} {...props}>
      {children}
    </div>
  );
};

export default FormTemplate;
