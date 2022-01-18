import { FunctionComponent, HTMLAttributes } from 'react';

const Button: FunctionComponent<HTMLAttributes<HTMLButtonElement>> = ({ className, children, ...rest }) => {
  return (
    <button {...rest} className={`transition shadow hover:shadow-md rounded px-4 py-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
