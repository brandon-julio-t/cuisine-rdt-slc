import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../../components/common/Card';
import FoodOrbitCanvas from '../../facades/FoodOrbitCanvas';
import Food from '../../models/Food';
import PointOfInterest from '../../models/PointOfInterest';
import FoodService from '../../services/FoodService';
import DetailPopUp from './components/DetailPopUp';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();

  if (!id) return <h1 className="text-4xl font-bold text-center">Invalid ID.</h1>;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [food, model, progress] = useFoodModel(id);
  const [currentPointOfInterest, setCurrentPointOfInterest] = useState<PointOfInterest | null>(null);
  const [canvasSystem, setCanvasSystem] = useState<FoodOrbitCanvas | null>(null);

  useEffect(() => {
    let system: FoodOrbitCanvas | null = null;
    if (canvas.current && food && model) system = new FoodOrbitCanvas(canvas.current, food, model);
    setCanvasSystem(system);
    return () => system?.cleanUp();
  }, [canvas.current, food, model]);

  if (!food || !model)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-4xl font-bold text-center">Loading {progress}%...</h1>
      </div>
    );

  const onPointOfInterestClicked = (pointOfInterest: PointOfInterest) => {
    setCurrentPointOfInterest(pointOfInterest);
    canvasSystem?.setCameraFocus(pointOfInterest.position);
    console.log('focus', canvasSystem);
  };

  return (
    <>
      {/* Top Left */}
      <div className="absolute top-3 md:top-4 lg:top-8 left-2 md:left-4 lg:left-8 z-20">
        <Link to="/">
          <div className="rounded-full shadow hover:shadow-md p-2 bg-white">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
        </Link>
      </div>

      {/* Top Middle */}
      <div className="absolute md:top-4 lg:top-8 w-full z-10 flex justify-center">
        <Card className="w-full md:w-auto">
          <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">{food.name}</h1>
        </Card>
      </div>

      {/* Middle Left */}
      {food.pointOfInterests.length ? (
        <div className="absolute left-0 md:left-4 lg:left-8 top-0 bottom-0 z-10 hidden md:flex items-center">
          <Card className="max-h-64 overflow-auto">
            <div className="flex flex-col space-y-2">
              <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
                Point of Interests
              </h2>
              {food.pointOfInterests.map(pointOfInterest => (
                <div
                  key={pointOfInterest.title}
                  className={`cursor-pointer ${
                    pointOfInterest.title === currentPointOfInterest?.title ? 'font-medium' : ''
                  }`}
                  onClick={() => onPointOfInterestClicked(pointOfInterest)}
                >
                  {pointOfInterest.title}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {/* Middle Right */}
      {currentPointOfInterest ? (
        <div className="absolute right-0 md:right-4 lg:right-8 top-0 bottom-0 z-10 hidden md:flex items-center">
          <Card className="max-h-64 max-w-xs overflow-auto">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-2">
              {currentPointOfInterest.title}
            </h2>
            <p>{currentPointOfInterest.description}</p>
          </Card>
        </div>
      ) : null}

      {/* Bottom Middle */}
      <div className="w-full absolute bottom-0 z-10 flex justify-center">
        <DetailPopUp food={food} />
      </div>

      <canvas ref={canvas} className="absolute top-0 left-0"></canvas>
    </>
  );
};

function useFoodModel(id: string): [Food | null, GLTF | null, string] {
  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<GLTF | null>(null);
  const [progress, setProgress] = useState<string>('0');

  useEffect(() => {
    (async () => {
      const food = await FoodService.getOneById(id);
      if (!food) return;
      setFood(food);

      const loader = new GLTFLoader();
      loader.load(
        food?.modelUrl,
        gltf => setModel(gltf),
        e => setProgress(Number((e.loaded / e.total) * 100).toFixed(1))
      );
    })();
  }, [id]);

  return [food, model, progress];
}

export default Detail;
