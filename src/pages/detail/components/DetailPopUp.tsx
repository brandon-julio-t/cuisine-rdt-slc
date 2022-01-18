import { Transition } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import Skeleton from '../../../components/common/Skeleton';
import Food from '../../../models/Food';

const DetailPopUp: FunctionComponent<HTMLAttributes<HTMLDivElement> & { food: Food | null }> = ({
  food,
  className,
  ...rest
}) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div {...rest} className={`max-w-prose mx-2 lg:mx-auto rounded-t-lg overflow-hidden ${className}`}>
      <Transition
        show={isShowPopup}
        enter="transform transform-gpu transition-all ease-in-out duration-500"
        enterFrom="translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transform transform-gpu transition-all ease-in-out duration-500"
        leaveFrom="translate-y-0 opacitgy-100"
        leaveTo="translate-y-full opacity-0"
        className="prose whitespace-pre-wrap bg-white/80 backdrop-blur border rounded-lg shadow hover:shadow-md p-4 max-h-64 overflow-y-auto"
      >
        {food ? food.description : <Skeleton />}
      </Transition>

      <button
        onClick={() => setIsShowPopup(!isShowPopup)}
        className="bg-white/80 backdrop-blur w-full flex justify-center items-center border rounded-lg py-3 mt-4 shadow hover:shadow-md"
      >
        More about {food ? food.name : <Skeleton className="ml-2 w-32" />}
        <span className="ml-1">
          {isShowPopup ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
        </span>
      </button>
    </div>
  );
};

export default DetailPopUp;
