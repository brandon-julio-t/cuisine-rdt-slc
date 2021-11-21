import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return <input {...props} className={`rounded ${props.className}`} />;
};

export default Input;
