import { Transition } from '@headlessui/react';
import React, { useState } from 'react';
import Food from '../../../models/Food';

interface Props {
  food: Food;
}

const DetailPopUp = ({ food }: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  const chevronUp = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
        clipRule='evenodd'
      />
    </svg>
  );
  const chevronDown = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  );

  return (
    <div className='mx-2 max-w-3xl lg:mx-auto rounded-t-lg overflow-hidden'>
      <button
        onClick={() => setIsShowPopup(!isShowPopup)}
        className='bg-primary-blue px-3 py-2 text-gray-50 w-full flex justify-center items-center'>
        More about {food.name}{' '}
        <span className='ml-1'>{isShowPopup ? chevronDown : chevronUp}</span>
      </button>

      <Transition
        show={isShowPopup}
        enter='transition duration-1000'
        enterFrom='h-0'
        enterTo='h-full'
        leave='transition duration-1000'
        leaveFrom='h-full'
        leaveTo='h-0'
        className={`bg-gray-100 ${isShowPopup && 'px-3 py-2'}`}>
        <p className='text-sm'>
          Sandwich, in its basic form, slices of meat, cheese, or other food
          placed between two slices of bread. Although this mode of consumption
          must be as old as meat and bread, the name was adopted only in the
          18th century for John Montagu, 4th earl of Sandwich.
        </p>

        {/* <div>
              <button>Button 1</button>
              <button>Take Quiz</button>
            </div> */}
      </Transition>
    </div>
  );
};

export default DetailPopUp;
