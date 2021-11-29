import { Dialog, Transition } from '@headlessui/react';
import React, { createContext, Fragment, useState } from 'react';

export const ModalContext = createContext<any>(null);

interface Props {
  children: any;
}

const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState({
    content: <div>Content Placeholder</div>,
    show: false,
    title: 'Title Placeholder',
  });

  function closeModal() {
    setModal({
      show: false,
      content: <div></div>,
      title: '',
    });
  }

  function openModal(title: string, content: any) {
    setModal({
      show: true,
      content,
      title,
    });
  }

  return (
    <ModalContext.Provider value={[openModal, closeModal]}>
      {modal.show && (
        <Transition appear show={modal.show} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-30 overflow-y-auto'
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClose={closeModal}>
            <div className='min-h-screen px-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'>
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <div className='inline-block w-full max-w-md lg:max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                  {modal.title !== '' && (
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'>
                      {modal.title}
                    </Dialog.Title>
                  )}
                  <div className='mt-2'>{modal.content}</div>

                  <div className='mt-4 text-right'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}

      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
