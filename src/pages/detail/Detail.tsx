import {
  ChevronLeftIcon,
  InformationCircleIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import FoodOrbitCanvas from '../../facades/FoodOrbitCanvas';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import DetailPopUp from './components/DetailPopUp';
import IngredientsModal from './components/IngredientModal';
import RecipeModal from './components/RecipeModal';
import VideoModal from './components/VideoModal';

const Detail: FunctionComponent = () => {
  const { id } = useParams<'id'>();

  if (!id)
    return <h1 className='text-4xl font-bold text-center'>Invalid ID.</h1>;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [food, foodModel] = useFoodModel(id);
  const [canvasSystem, setCanvasSystem] = useState<FoodOrbitCanvas | null>(
    null,
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showPopupMenu, setShowPopupMenu] = useState(false);

  useEffect(() => {
    const system = canvas.current ? new FoodOrbitCanvas(canvas.current) : null;
    setCanvasSystem(system);
    return () => system?.cleanUp();
  }, [canvas.current]);

  useEffect(() => {
    if (foodModel) {
      canvasSystem?.loadModel(foodModel);
    }
  }, [foodModel]);

  const buttons = [
    {
      id: 1,
      title: 'Recipe',
      callback: setShowRecipeModal,
      iconElm: <QuestionMarkCircleIcon className='h-4 w-4 cursor-pointer' />,
    },
    {
      id: 2,
      title: 'Ingredients',
      callback: setShowIngredientsModal,
      iconElm: <InformationCircleIcon className='h-4 w-4 cursor-pointer' />,
    },
    {
      id: 3,
      title: 'Video',
      callback: setShowVideoModal,
      iconElm: <PlayIcon className='h-4 w-4 cursor-pointer' />,
    },
  ];

  return (
    <>
      <div className='absolute top-4 w-full z-20'>
        <div className='relative'>
          {/* Top Left */}
          <Link className='absolute top-3 left-4' to='/'>
            <div className='rounded-full border shadow hover:shadow-md p-2 bg-white/80 backdrop-blur max-w-min'>
              <ChevronLeftIcon className='h-5 w-5' />
            </div>
          </Link>

          {/* Top Middle */}
          <div>
            <Card className='w-72 md:min-w-xl mx-auto bg-white/80 backdrop-blur'>
              <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center'>
                {food ? food.name : <Skeleton />}
              </h1>
            </Card>
          </div>

          {/* Top Right */}
          <div className='absolute top-3 right-4'>
            <div className='relative rounded-full border shadow hover:shadow-md p-2 bg-white/80 max-w-min'>
              <MenuIcon
                onClick={() => {
                  setShowPopupMenu(!showPopupMenu);
                }}
                className='h-5 w-5'
              />

              <ul
                className={`${
                  showPopupMenu ? 'opacity-100' : 'opacity-0'
                } transition-all duration-300 p-1 absolute divide-y-2 bg-white shadow-lg border border-gray-200 rounded top-10 right-8`}>
                {buttons.map((btn) => (
                  <li key={btn.id}>
                    <button
                      onClick={() => {
                        btn.callback(true);
                      }}
                      className='flex py-2 pl-2 pr-8 items-center'>
                      {btn.iconElm}
                      <span className='ml-1'>{btn.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Middle */}
      <div className='w-full absolute bottom-4 z-20 flex justify-center'>
        <DetailPopUp food={food} className='flex-1' />
      </div>

      <canvas ref={canvas} className='absolute inset-0'></canvas>

      <VideoModal
        show={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        food={food}
      />
      <RecipeModal
        show={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
        food={food}
      />
      <IngredientsModal
        show={showIngredientsModal}
        onClose={() => setShowIngredientsModal(false)}
        food={food}
      />
    </>
  );
};

const useFoodModel = (id: string): [Food | null, Group | null] => {
  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<Group | null>(null);

  useEffect(() => {
    (async () => {
      const food = await FoodService.getOneById(id);
      if (!food) return;
      setFood(food);

      const loader = new GLTFLoader();
      const model = await loader.loadAsync(food.modelUrl);
      const foodModel = model.scene;
      setModel(foodModel);
    })();
  }, [id]);

  return [food, model];
};

export default Detail;
