import { XIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import Food from '../../../models/Food';
import FoodService from '../../../services/FoodService';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/forms/Input';
import Textarea from '../../../components/common/forms/Textarea';

interface Props {
  isOpen: boolean;
  food: Food | null;
  onClose: () => void;
  action: 'Create' | 'Update';
  refresh: () => void;
}

const FoodForm = ({ isOpen, food, onClose, action, refresh }: Props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modelUrl, setModelUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setId(food?.id ?? '00000000-0000-0000-0000-000000000000');
    setName(food?.name ?? '');
    setDescription(food?.description ?? '');
    setModelUrl(food?.modelUrl ?? '');
    setVideoUrl(food?.videoUrl ?? '');
    setImageUrl(food?.imageUrl ?? ''), setScale(food?.scale ?? 1);
  }, [food]);

  const closeModal = () => onClose();
  const onCreate = (food: Food) => FoodService.create(food);
  const onUpdate = (food: Food) => FoodService.update(food);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const food = new Food(
      id,
      name,
      description,
      modelUrl,
      videoUrl,
      imageUrl,
      scale,
    );
    const fn = {
      Create: onCreate,
      Update: onUpdate,
    }[action];
    fn(food);
    refresh();
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
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
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
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
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-xl font-medium leading-6 text-gray-900'>
                  <div className='flex justify-between'>
                    <span>{action}</span>
                    <button onClick={closeModal}>
                      <XIcon className='h-5 w-5' />
                    </button>
                  </div>
                </Dialog.Title>

                <form
                  onSubmit={onSubmit}
                  className='mt-4 grid grid-cols-1 gap-4'>
                  <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    name='description'
                    placeholder='Description'
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    type='text'
                    name='modelUrl'
                    placeholder='Model URL'
                    value={modelUrl}
                    onChange={(e) => setModelUrl(e.target.value)}
                  />
                  <Input
                    type='text'
                    name='videoUrl'
                    placeholder='Video URL'
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <Input
                    type='text'
                    name='imageUrl'
                    placeholder='Image URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Input
                    type='number'
                    name='scale'
                    placeholder='Scale'
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Button type='submit'>{action}</Button>
                    <Button type='button' onClick={closeModal}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FoodForm;
