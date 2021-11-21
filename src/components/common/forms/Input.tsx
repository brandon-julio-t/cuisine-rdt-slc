import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return <input {...props} className={`rounded ${props.className}`} />;
};

export default Input;
