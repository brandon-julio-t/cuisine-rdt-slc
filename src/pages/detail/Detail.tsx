import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  XIcon,
} from '@heroicons/react/solid';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../../components/common/Card';
import FoodOrbitCanvas from '../../facades/FoodOrbitCanvas';
import Food from '../../models/Food';
import PointOfInterest from '../../models/PointOfInterest';
import { ModalContext } from '../../providers/ModalProvider';
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
  const [openModal, closeModal] = useContext(ModalContext);
  const [openPointOfInterest, setOpenPointOfInterest] = useState(false);

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

  const onSetCurrentPointOfInterest = (pointOfInterest: PointOfInterest | null) => {
    pointOfInterest = pointOfInterest === currentPointOfInterest ? null : pointOfInterest;
    setCurrentPointOfInterest(pointOfInterest);
    canvasSystem?.setCameraFocus(pointOfInterest?.position ?? new Vector3(0, 0, 0));
  };

  const onVideoBtnClicked = () => {
    const content = (
      <div>
        <iframe
          className="w-full h-60 lg:h-96"
          src="https://www.youtube.com/embed/1bSd78FL6gk"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
    openModal('', content);
  };

  return (
    <>
      {/* Top Left */}
      <div className="absolute top-3 md:top-4 left-1 sm:left-2 md:left-4 z-40">
        <Link to="/">
          <div className="rounded-full shadow hover:shadow-md p-2 bg-white">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
        </Link>
      </div>

      {/* Top Middle */}
      <div className="absolute top-1 sm:top-2 md:top-4 w-full z-10 flex justify-center">
        <Card className="w-full md:w-auto">
          <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">{food.name}</h1>
        </Card>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-1 sm:right-2 md:right-4 w-full text-right z-20">
        <button title="Play Video" onClick={() => onVideoBtnClicked()}>
          <PlayIcon className="h-8 w-8" />
        </button>
      </div>

      {/* Middle Left */}
      {food.pointOfInterests.length ? (
        <div className="absolute left-1 sm:left-2 md:left-4 top-0 bottom-0 z-30 hidden md:flex items-center">
          {openPointOfInterest ? (
            <Card className="max-h-[50%] overflow-auto mr-1">
              <div className="flex flex-col space-y-2 relative">
                <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center sticky top-0 bg-white py-2">
                  Point of Interests
                </h2>
                {food.pointOfInterests.map(pointOfInterest => (
                  <div
                    key={pointOfInterest.title}
                    className={`cursor-pointer ${
                      pointOfInterest.title === currentPointOfInterest?.title ? 'bg-blue-50' : ''
                    } hover:bg-blue-100 rounded-lg p-2`}
                    onClick={() => onSetCurrentPointOfInterest(pointOfInterest)}
                  >
                    {pointOfInterest.title}
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
          <button onClick={() => setOpenPointOfInterest(!openPointOfInterest)}>
            {openPointOfInterest ? (
              <ChevronDoubleLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronDoubleRightIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      ) : null}

      {/* Middle Right */}
      {currentPointOfInterest ? (
        <div className="absolute right-1 sm:right-2 md:right-4 top-0 bottom-0 z-30 hidden md:flex items-center">
          <Card className="max-h-[50%] max-w-xs overflow-auto relative">
            <div className="flex justify-between items-center mb-2 sticky top-0 bg-white py-2">
              <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center">
                {currentPointOfInterest.title}
              </h2>

              <button onClick={() => onSetCurrentPointOfInterest(null)}>
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <p>{currentPointOfInterest.description}</p>
          </Card>
        </div>
      ) : null}

      {/* Bottom Middle */}
      <div className="w-full absolute bottom-0 z-20 flex justify-center">
        <DetailPopUp food={food} />
      </div>

      <canvas ref={canvas} className="absolute inset-0"></canvas>
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
      const gltf = await loader.loadAsync(food?.modelUrl, e => {
        const progress = Number((e.loaded / e.total) * 100).toFixed(1);
        console.log(progress);
        setProgress(progress);
      });

      setModel(gltf);
    })();
  }, [id]);

  return [food, model, progress];
}

export default Detail;
