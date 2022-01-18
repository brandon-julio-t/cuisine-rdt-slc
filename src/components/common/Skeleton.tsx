import { FunctionComponent, HTMLAttributes } from 'react';

const Skeleton: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return <div className={`animate-pulse bg-slate-700 h-4 rounded-xl ${className}`}></div>;
};

export default Skeleton;
