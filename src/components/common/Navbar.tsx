import React from 'react';

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <h1 className='font-bold text-xl'>Cuisine App</h1>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
              <a
                href='#'
                className='border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                Home
              </a>
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
            {/* <div className='ml-3 relative'>
              <div>
                <button
                  type='button'
                  className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=nkXPoOrIl0&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </button>
              </div>

              <div
                className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex={-1}>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-0'>
                  Your Profile
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-1'>
                  Settings
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-2'>
                  Sign out
                </a>
              </div>
            </div> */}
          </div>
          <div className='-mr-2 flex items-center sm:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-controls='mobile-menu'
              aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <div className='sm:hidden' id='mobile-menu'>
        <div className='pt-2 pb-3 space-y-1'>
          <a
            href='#'
            className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
            Home
          </a>
        </div>
        <div className='pt-4 pb-3 border-t border-gray-200'>
          <div className='flex items-center px-4'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=nkXPoOrIl0&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium text-gray-800'>
                Tom Cook
              </div>
              <div className='text-sm font-medium text-gray-500'>
                tom@example.com
              </div>
            </div>
          </div>
          <div className='mt-3 space-y-1'>
            <a
              href='#'
              className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'>
              Your Profile
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'>
              Settings
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'>
              Sign out
            </a>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
