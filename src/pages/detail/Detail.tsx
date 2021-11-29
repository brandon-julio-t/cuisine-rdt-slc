import { Transition } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../../components/common/Card';
import FoodOrbitCanvas from '../../facades/FoodOrbitCanvas';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import DetailPopUp from './components/DetailPopUp';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();

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
        <DetailPopUp food={food} />
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
