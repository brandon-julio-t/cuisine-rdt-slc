import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const   Button = (props: Props) => {
  return (
    <button {...props} className={`shadow hover:shadow-md rounded px-4 py-2 ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
