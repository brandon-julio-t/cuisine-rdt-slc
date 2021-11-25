import { Transition } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../components/common/Card';
import FoodOrbitCanvas from '../facades/FoodOrbitCanvas';
import Food from '../models/Food';
import FoodService from '../services/FoodService';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();
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

  if (!id)
    return <h1 className='text-4xl font-bold text-center'>Invalid ID.</h1>;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [food, model] = useFoodModel(id);

  useEffect(() => {
    let system: FoodOrbitCanvas | null = null;
    if (canvas.current && food && model)
      system = new FoodOrbitCanvas(canvas.current, food, model);
    return () => {
      system?.cleanUp();
    };
  }, [canvas.current, food, model]);

  if (!food || !model)
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <h1 className='text-4xl font-bold text-center'>Loading...</h1>
      </div>
    );

  return (
    <>
      <div className='absolute top-5 md:top-8 left-8 z-20'>
        <Link to='/'>
          <div className='rounded-full shadow hover:shadow-md p-2'>
            <ChevronLeftIcon className='h-5 w-5' />
          </div>
        </Link>
      </div>

      <div className='absolute md:top-8 w-full'>
        <Card className='max-w-xl mx-auto'>
          <h1 className='text-3xl font-semibold text-center'>{food.name}</h1>
        </Card>
      </div>

      <div className='w-full absolute bottom-0 z-10'>
        <div className='mx-2 max-w-3xl lg:mx-auto rounded-t-lg overflow-hidden'>
          <button
            onClick={() => setIsShowPopup(!isShowPopup)}
            className='bg-primary-blue px-3 py-2 text-gray-50 w-full flex justify-center items-center'>
            More about {food.name}{' '}
            <span className='ml-1'>
              {isShowPopup ? chevronDown : chevronUp}
            </span>
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
              placed between two slices of bread. Although this mode of
              consumption must be as old as meat and bread, the name was adopted
              only in the 18th century for John Montagu, 4th earl of Sandwich.
            </p>

            {/* <div>
              <button>Button 1</button>
              <button>Take Quiz</button>
            </div> */}
          </Transition>
        </div>
      </div>

      <canvas ref={canvas} className='absolute top-0 left-0'></canvas>
    </>
  );
};

function useFoodModel(id: string): [Food | null, GLTF | null] {
  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<GLTF | null>(null);

  useEffect(() => {
    (async () => {
      const food = await FoodService.getOneById(id);
      if (!food) return;
      setFood(food);
      new GLTFLoader().load(food?.modelUrl, (gltf) => {
        setModel(gltf);
      });
    })();
  }, [id]);

  return [food, model];
}

export default Detail;
