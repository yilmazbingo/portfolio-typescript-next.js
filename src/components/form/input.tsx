import React from "react";
import { Ref } from "react-hook-form";
interface InputProps {
  error: any;
  name: string;
  label: string;
  //   ref: (ref: (TFieldElement & Ref) | null) => void;
  type: string;
}

const Input: React.FC<InputProps> = ({ error, name, label, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input {...rest} className="form-control" id={name} name={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
