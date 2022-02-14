import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';
import Modal from '../../../components/common/Modal';
import Skeleton from '../../../components/common/Skeleton';
import Food from '../../../models/Food';

const RecipeModal: FunctionComponent<{
  show: boolean;
  onClose: () => void;
  food: Food | null;
}> = ({ show, onClose, food }) => {
  return food ? (
    <Modal title='How to Cook' show={show} onClose={onClose}>
      <If condition={food.cookingProcess.length == 1}>
        <Then>{renderSteps(food.cookingProcess[0].steps)}</Then>
        <Else>
          <div className='w-full px-1 mx-auto bg-white rounded-2xl max-h-[60vh] overflow-auto space-y-3'>
            {food?.cookingProcess.map((process) => (
              <Disclosure key={process.header}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                      <span>{process.header}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-blue-500`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'>
                      <Disclosure.Panel className='px-2 text-sm text-gray-500'>
                        {renderSteps(process.steps)}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </Else>
      </If>
    </Modal>
  ) : (
    <Skeleton />
  );
};

const renderSteps = (steps: string[]) => {
  return (
    <ul className='overflow-auto max-h-[60vh]'>
      {steps.map((step, idx) => (
        <li key={idx} className='flex mb-1'>
          <span className='block mr-1 font-bold'>{idx + 1}. </span>
          <span className='block'>
            <span className='block text-sm'>{step}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecipeModal;
