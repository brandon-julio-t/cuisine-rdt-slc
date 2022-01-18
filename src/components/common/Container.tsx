import { FunctionComponent, HTMLAttributes } from 'react';

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
