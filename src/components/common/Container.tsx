import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = (props: Props) => {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{props.children}</div>;
};

export default Container;
