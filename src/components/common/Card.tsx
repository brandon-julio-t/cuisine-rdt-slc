import { FunctionComponent, HTMLAttributes } from 'react';

const Card: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${[
        'bg-white',
        'border',
        'overflow-auto',
        'shadow',
        'hover:shadow-md',
        'rounded-lg',
        'transition-all',
        'px-4',
        'py-5',
        'sm:p-6',
        className,
      ].join(' ')}`}
    >
      {children}
    </div>
  );
};

export default Card;
