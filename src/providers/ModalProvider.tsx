import React, { createContext, ReactComponentElement, useState } from 'react';

export const ModalContext = createContext<any>(null);

interface Props {
  children: any;
}

const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState({
    content: <div></div>,
    show: false,
    title: '',
  });

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {modal.show && (
        <div
          className='w-full fixed h-screen flex justify-center items-center top-0 left-0 z-30'
          style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className='w-5/6 md:w-3/4 lg:w-3/5 p-4'>{modal.content}</div>
        </div>
      )}

      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
