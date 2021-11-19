import React from 'react';
import BaseProps from '../../interfaces/BaseProps.interface';

interface Props extends BaseProps {}

const Card = (props: Props) => {
  return (
    <div className="bg-white overflow-hidden shadow hover:shadow-md rounded-lg transition-all">
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
};

export default Card;
