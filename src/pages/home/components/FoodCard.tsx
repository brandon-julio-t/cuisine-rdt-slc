import { Link } from 'react-router-dom';
import Food from '../../../models/Food';

interface Props {
  food: Food;
}

const FoodCard = ({ food }: Props) => {
  return (
    <Link
      to={`/detail/${food.id}`}
      className='rounded-md overflow-hidden shadow hover:shadow-md transition bg-gray-100'>
      <img src={food.imageUrl} className='w-full h-36 md:h-56 object-cover' />
      <div className='text-sm font-semibold px-3 py-2 text-center text-gray-700'>
        {food.name}
      </div>
    </Link>
  );
};

export default FoodCard;
