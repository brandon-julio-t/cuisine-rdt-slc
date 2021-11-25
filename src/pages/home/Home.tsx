import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import FoodCard from './components/FoodCard';
import FoodForm from './components/FoodForm';

interface Props {}

const Home = (props: Props) => {
  const [action, setAction] = useState<'Create' | 'Update'>('Create');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [food, setFood] = useState<Food | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFoods = async () => setFoods(await FoodService.getAll());

  useEffect(() => {
    fetchFoods();
  }, []);

  const reset = () => {
    setAction('Create');
    setFood(null);
    setIsCreateFormOpen(false);
  };

  const onCreate = () => {
    setAction('Create');
    setFood(null);
    setIsCreateFormOpen(true);
  };

  const onUpdate = (food: Food) => {
    setAction('Update');
    setFood(food);
    setIsCreateFormOpen(true);
  };

  const onDelete = (food: Food) => {
    FoodService.delete(food);
    setFoods(foods.filter((x) => x.id !== food.id));
    reset();
  };

  return (
    <>
      <Container>
        <div className='bg-primary-light-blue h-28 rounded-md mt-4'></div>

        <input
          type='search'
          className='w-full rounded-md border border-gray-300 outline-none ring-0 my-4'
          placeholder='Search...'
        />

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
          {foods.map((food) => (
            <FoodCard food={food} key={food.id}></FoodCard>
          ))}
        </div>
      </Container>

      <FoodForm
        isOpen={isCreateFormOpen}
        food={food}
        onClose={reset}
        action={action}
        refresh={fetchFoods}
      />
    </>
  );
};

export default Home;
