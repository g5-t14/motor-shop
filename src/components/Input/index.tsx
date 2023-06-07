import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input {...rest} />
  );
};

export default Input;