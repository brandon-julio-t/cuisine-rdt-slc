import { ChevronLeftIcon, InformationCircleIcon, PlayIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import FoodOrbitCanvas from '../../facades/FoodOrbitCanvas';
import Food from '../../models/Food';
import PointOfInterest from '../../models/PointOfInterest';
import FoodService from '../../services/FoodService';
import DetailPopUp from './components/DetailPopUp';
import IngredientsModal from './components/IngredientModal';
import RecipeModal from './components/RecipeModal';
import VideoModal from './components/VideoModal';

const Detail: FunctionComponent = () => {
  const { id } = useParams<'id'>();

  if (!id) return <h1 className="text-4xl font-bold text-center">Invalid ID.</h1>;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [food, foodModel] = useFoodModel(id);
  const [currentPointOfInterest, setCurrentPointOfInterest] = useState<PointOfInterest | null>(null);
  const [canvasSystem, setCanvasSystem] = useState<FoodOrbitCanvas | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [openPointOfInterest, setOpenPointOfInterest] = useState(false);

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

  const onSetCurrentPointOfInterest = (pointOfInterest: PointOfInterest | null) => {
    pointOfInterest = pointOfInterest === currentPointOfInterest ? null : pointOfInterest;
    setCurrentPointOfInterest(pointOfInterest);
    canvasSystem?.setCameraFocus(pointOfInterest?.position ?? new Vector3(0, 0, 0));
  };

  return (
    <>
      <div className="absolute top-4 w-full z-20">
        <div className="grid grid-cols-3 gap-4 items-center px-4">
          {/* Top Left */}
          <Link to="/">
            <div className="rounded-full border shadow hover:shadow-md p-2 bg-white/80 backdrop-blur max-w-min">
              <ChevronLeftIcon className="h-5 w-5" />
            </div>
          </Link>

          {/* Top Middle */}
          <div>
            <Card className="w-full md:w-auto bg-white/80 backdrop-blur">
              <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
                {food ? food.name : <Skeleton />}
              </h1>
            </Card>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:space-x-4 justify-end items-end">
              <QuestionMarkCircleIcon onClick={() => setShowRecipeModal(true)} className="h-8 w-8 cursor-pointer" />
              <InformationCircleIcon onClick={() => setShowIngredientsModal(true)} className="h-8 w-8 cursor-pointer" />
              <PlayIcon onClick={() => setShowVideoModal(true)} className="h-8 w-8 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Middle */}
      <div className="w-full absolute bottom-4 z-20 flex justify-center">
        <DetailPopUp food={food} className="flex-1" />
      </div>

      <canvas ref={canvas} className="absolute inset-0"></canvas>

      <VideoModal show={showVideoModal} onClose={() => setShowVideoModal(false)} food={food} />
      <RecipeModal show={showRecipeModal} onClose={() => setShowRecipeModal(false)} food={food} />
      <IngredientsModal show={showIngredientsModal} onClose={() => setShowIngredientsModal(false)} food={food} />
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
