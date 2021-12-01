import { Transition } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Food from '../../../models/Food';

interface Props {
  food: Food;
}

const DetailPopUp = ({ food }: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div className="max-w-prose mx-2 lg:mx-auto rounded-t-lg overflow-hidden flex-1">
      <button
        onClick={() => setIsShowPopup(!isShowPopup)}
        className="bg-primary-blue px-3 py-2 text-gray-50 w-full flex justify-center items-center"
      >
        More about {food.name}
        <span className="ml-1">
          {isShowPopup ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
        </span>
      </button>

      <Transition
        show={isShowPopup}
        enter="transition duration-1000"
        enterFrom="h-0"
        enterTo="h-full"
        leave="transition duration-1000"
        leaveFrom="h-full"
        leaveTo="h-0"
        className={`bg-gray-100 ${isShowPopup && 'px-3 py-2'}`}
      >
        <p className="text-sm">{food.description}</p>

        {/* <div>
              <button>Button 1</button>
              <button>Take Quiz</button>
            </div> */}
      </Transition>
    </div>
  );
};

export default DetailPopUp;
