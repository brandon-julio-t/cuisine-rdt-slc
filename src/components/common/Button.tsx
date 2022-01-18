import { ButtonHTMLAttributes, FunctionComponent } from 'react';

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`transition border border-slate-200 hover:border-slate-300 shadow hover:shadow-md rounded px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
