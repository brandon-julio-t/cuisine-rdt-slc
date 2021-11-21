import React, { HTMLAttributes } from 'react';
import BaseProps from '../../interfaces/BaseProps.interface';

interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {}

const Card = (props: Props) => {
  return (
    <div className={`bg-white overflow-auto shadow hover:shadow-md rounded-lg transition-all ${props.className}`}>
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
};

export default Card;
