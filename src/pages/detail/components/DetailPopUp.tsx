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
    <div className="max-w-prose mx-2 lg:mx-auto rounded-t-lg overflow-hidden flex-1 pb-4">
      <Transition
        show={isShowPopup}
        enter="transform transform-gpu transition-all ease-in-out duration-500"
        enterFrom="translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transform transform-gpu transition-all ease-in-out duration-500"
        leaveFrom="translate-y-0 opacitgy-100"
        leaveTo="translate-y-full opacity-0"
        className="prose bg-white/80 backdrop-blur border rounded-lg shadow hover:shadow-md p-4 max-h-64 overflow-y-auto"
      >
        {food.description}

        {/* <div>
              <button>Button 1</button>
              <button>Take Quiz</button>
            </div> */}
      </Transition>

      <button
        onClick={() => setIsShowPopup(!isShowPopup)}
        className="bg-white/80 backdrop-blur w-full flex justify-center items-center border rounded-lg py-3 mt-4 shadow hover:shadow-md"
      >
        More about {food.name}
        <span className="ml-1">
          {isShowPopup ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
        </span>
      </button>
    </div>
  );
};

export default DetailPopUp;
