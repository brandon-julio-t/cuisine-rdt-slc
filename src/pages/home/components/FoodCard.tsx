import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Food from '../../../models/Food';

const FoodCard: FunctionComponent<{ food: Food }> = ({ food }) => {
  return (
    <Link to={`/detail/${food.id}`}>
      <Card className='group w-[192px] md:w-[264px]'>
        <div className='overflow-hidden'>
          <img
            src={food.imageUrl}
            className='transition group-hover:scale-110 ease-out w-full h-36 md:h-56 object-cover'
          />
        </div>
        <div className='text-sm font-semibold text-center text-gray-700'>
          {food.name}
        </div>
      </Card>
    </Link>
  );
};

export default FoodCard;
