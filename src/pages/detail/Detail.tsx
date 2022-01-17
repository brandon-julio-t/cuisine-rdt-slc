import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  XIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MemoryCacheAdapter } from '../../adapters/MemoryCacheAdapter';
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

  if (!id)
    return <h1 className='text-4xl font-bold text-center'>Invalid ID.</h1>;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [food, model] = useFoodModel(id);
  const [currentPointOfInterest, setCurrentPointOfInterest] =
    useState<PointOfInterest | null>(null);
  const [canvasSystem, setCanvasSystem] = useState<FoodOrbitCanvas | null>(
    null,
  );
  const [openModal, closeModal] = useContext(ModalContext);
  const [openPointOfInterest, setOpenPointOfInterest] = useState(false);

  useEffect(() => {
    let system: FoodOrbitCanvas | null = null;
    if (canvas.current && food && model)
      system = new FoodOrbitCanvas(canvas.current, food, model);
    setCanvasSystem(system);
    return () => system?.cleanUp();
  }, [canvas.current, food, model]);

  if (!food || !model)
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <h1 className='text-4xl font-bold text-center'>Loading...</h1>
      </div>
    );

  const onSetCurrentPointOfInterest = (
    pointOfInterest: PointOfInterest | null,
  ) => {
    pointOfInterest =
      pointOfInterest === currentPointOfInterest ? null : pointOfInterest;
    setCurrentPointOfInterest(pointOfInterest);
    canvasSystem?.setCameraFocus(
      pointOfInterest?.position ?? new Vector3(0, 0, 0),
    );
  };

  const onVideoBtnClicked = () => {
    const content = (
      <div>
        <iframe
          className='w-full h-60 lg:h-96'
          src={food.videoUrl}
          title='YouTube video player'
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen></iframe>
      </div>
    );
    openModal('', content);
  };

  const onShowRecipeBtnClicked = () => {
    const dummySteps = [
      {
        title: 'Cut the beef',
        description:
          'Cut the beef into 4 cm squares, half cm thick. Do not cut the beef too small as the meat can break into smaller pieces during cooking.',
      },
      {
        title: 'Blend the spice',
        description: 'Blend all the ingredients in (B), set the blend aside.',
      },
      {
        title: 'Bash the lemongrass',
        description:
          'Remove the green section and the outer sheath of the lemongrass. Use only the white portion. Bash them so that the lemongrass to ensure the release of the flavor.',
      },
      {
        title: 'Saute the spice',
        description:
          'Heat up the vegetable oil in a wok. Saute the spice paste (B) over low heat until aromatic.',
      },
      {
        title: 'Add coconut milk',
        description: 'Add the coconut milk and lemongrass into the wok.',
      },
      {
        title: 'Add the beef',
        description:
          'Add the beef and cook over medium heat. Bring the coconut milk to a boil.',
      },
      {
        title: 'Simmer the beef',
        description:
          'Once it is boiled, continue to simmer over low heat. Add water from time to time when the stew is about to dry.',
      },
      {
        title: 'Cook until tender and turns into dark brown',
        description:
          'Cook until the beef absorbs the flavor of the spices thoroughly and the color turns to dark brown. It will take about three hours.',
      },
    ];

    const content = (
      <div>
        <ul style={{ maxHeight: '60vh' }} className='overflow-auto'>
          {dummySteps.map((step, idx) => (
            <li className='flex mb-1'>
              <span className='block mr-1 font-bold'>{idx + 1}. </span>
              <span className='block'>
                <span className='block font-semibold'>{step.title}</span>
                <span className='block'>{step.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
    openModal('How to cook', content);
  };

  const onShowIngredientBtnClicked = () => {
    const content = (
      <div>
        <iframe
          className='w-full h-60 lg:h-96'
          src={food.videoUrl}
          title='YouTube video player'
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen></iframe>
      </div>
    );
    openModal('', content);
  };

  return (
    <>
      {/* Top Left */}
      <div className='absolute top-4 md:top-9 left-3 sm:left-3 md:left-4 z-40'>
        <Link to='/'>
          <div className='rounded-full border shadow hover:shadow-md p-2 bg-white/80 backdrop-blur'>
            <ChevronLeftIcon className='h-5 w-5' />
          </div>
        </Link>
      </div>

      {/* Top Middle */}
      <div className='absolute top-1 sm:top-2 md:top-4 w-full z-10 flex justify-center flex-col'>
        <Card className='w-full md:w-auto bg-white/80 backdrop-blur'>
          <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center'>
            {food.name}
          </h1>
        </Card>

        <div className='flex justify-end mt-2 mr-2'>
          <button
            className='ml-2'
            title='Show Recipe'
            onClick={onShowRecipeBtnClicked}>
            <QuestionMarkCircleIcon className='h-9 w-9' />
          </button>

          <button
            className='ml-2'
            title='Show Ingredients'
            onClick={onShowIngredientBtnClicked}>
            <InformationCircleIcon className='h-9 w-9' />
          </button>

          <button
            className='ml-2'
            title='Play Video'
            onClick={onVideoBtnClicked}>
            <PlayIcon className='h-9 w-9' />
          </button>
        </div>
      </div>

      {/* Middle Left */}
      {food.pointOfInterests.length ? (
        <div className='absolute left-1 sm:left-2 md:left-4 top-0 bottom-0 z-30 hidden sm:flex items-center'>
          {openPointOfInterest ? (
            <Card className='max-h-[50%] overflow-auto mr-1'>
              <div className='flex flex-col space-y-2 relative'>
                <h2 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center sticky top-0 bg-white/80 backdrop-blur py-2'>
                  Point of Interests
                </h2>
                {food.pointOfInterests.map((pointOfInterest) => (
                  <div
                    key={pointOfInterest.title}
                    className={`cursor-pointer ${
                      pointOfInterest.title === currentPointOfInterest?.title
                        ? 'bg-blue-50'
                        : ''
                    } hover:bg-blue-100 rounded-lg p-2`}
                    onClick={() =>
                      onSetCurrentPointOfInterest(pointOfInterest)
                    }>
                    {pointOfInterest.title}
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
          <button onClick={() => setOpenPointOfInterest(!openPointOfInterest)}>
            {openPointOfInterest ? (
              <ChevronDoubleLeftIcon className='h-6 w-6' />
            ) : (
              <ChevronDoubleRightIcon className='h-6 w-6' />
            )}
          </button>
        </div>
      ) : null}

      {/* Middle Right */}
      {currentPointOfInterest ? (
        <div className='absolute right-1 sm:right-2 md:right-4 top-0 bottom-0 max-w-[30%] z-30 hidden sm:flex justify-end items-center'>
          <Card className='max-h-[50%] overflow-auto relative'>
            <div className='flex justify-between items-center mb-2 sticky top-0 bg-white/80 backdrop-blur py-2'>
              <h2 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold text-center'>
                {currentPointOfInterest.title}
              </h2>

              <button onClick={() => onSetCurrentPointOfInterest(null)}>
                <XIcon className='h-5 w-5' />
              </button>
            </div>
            <p>{currentPointOfInterest.description}</p>
          </Card>
        </div>
      ) : null}

      {/* Bottom Middle */}
      <div className='w-full absolute bottom-0 z-20 flex justify-center'>
        <DetailPopUp food={food} />
      </div>

      <canvas ref={canvas} className='absolute inset-0'></canvas>
    </>
  );
};

function useFoodModel(id: string): [Food | null, Group | null] {
  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<Group | null>(null);

  useEffect(() => {
    (async () => {
      const food = await FoodService.getOneById(id);
      if (!food) return;
      setFood(food);

      const key = `${food.id}:${food.modelUrl}`;
      let foodModel = MemoryCacheAdapter.get<Group>(key);
      if (!foodModel) {
        const loader = new GLTFLoader();
        const model = await loader.loadAsync(food.modelUrl);
        foodModel = model.scene;
        MemoryCacheAdapter.save(key, foodModel);
      }

      setModel(foodModel);
    })();
  }, [id]);

  return [food, model];
}

export default Detail;
