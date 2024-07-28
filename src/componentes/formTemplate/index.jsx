import React from "react";
import "./style.css"; 

const FormTemplate = ({ children, ...rest }) => {
  return <form className="template-form" {...rest}>{children}</form>;
};

export default FormTemplate;
