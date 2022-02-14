import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { FunctionComponent } from 'react';
import Modal from '../../../components/common/Modal';
import Skeleton from '../../../components/common/Skeleton';
import Food from '../../../models/Food';

const IngredientsModal: FunctionComponent<{
  show: boolean;
  onClose: () => void;
  food: Food | null;
}> = ({ show, onClose, food }) => {
  return (
    <Modal show={show} onClose={onClose}>
      {food ? (
        <div className='w-full px-1 mx-auto bg-white rounded-2xl max-h-[60vh] overflow-auto space-y-3'>
          {food.ingredients.map((ingredient) => (
            <Disclosure key={ingredient.header}>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'>
                    <span>{ingredient.header}</span>
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
                      <ul className='space-y-3'>
                        {ingredient.items.map((item) => (
                          <div key={item.name} className='flex'>
                            <div className='w-12 h-12'>
                              <img
                                className='w-full object-cover rounded-lg'
                                src='https://files.nccih.nih.gov/ginger-thinkstockphotos-531052216-square.jpg'
                                alt=''
                              />
                            </div>

                            <div className='ml-2'>
                              <span className='block font-semibold'>
                                {item.name}
                              </span>
                              <span className='block text-sm'>
                                {renderDesc(item)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </Modal>
  );
};

const renderDesc = (item: any) => {
  if (item.amount && item.description)
    return `${item.amount}, ${item.description}`;
  else if (item.amount) return `${item.amount}`;
  else if (item.description) return `${item.description}`;
  else return '';
};

export default IngredientsModal;
