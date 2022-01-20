import { FunctionComponent } from 'react';
import Modal from '../../../components/common/Modal';
import Food from '../../../models/Food';

const RecipeModal: FunctionComponent<{
  show: boolean;
  onClose: () => void;
  food: Food | null;
}> = ({ show, onClose, food }) => {
  return (
    <Modal title='How to Cook' show={show} onClose={onClose}>
      <ul className='overflow-auto max-h-[60vh]'>
        {dummySteps.map((step, idx) => (
          <li key={idx} className='flex mb-1'>
            <span className='block mr-1 font-bold'>{idx + 1}. </span>
            <span className='block'>
              <span className='block font-semibold'>{step.title}</span>
              <span className='block text-sm'>{step.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

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

export default RecipeModal;
