import { FunctionComponent, useEffect, useState } from 'react';
import Container from '../../components/common/Container';
import Navbar from '../../components/common/Navbar';
import pattern from '../../images/pattern.png';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import FoodCard from './components/FoodCard';
import FoodForm from './components/FoodForm';

const Home: FunctionComponent = () => {
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

  const filterFood = async (e: any) => {
    const query: string = e.target.value;
    setFoods(await FoodService.filter(query));
  };

  return (
    <>
      <Navbar />

      <Container>
        <div
          style={{ backgroundImage: `url(${pattern})` }}
          className="bg-primary-light-blue h-28 rounded-md mt-4 bg-contain bg-repeat"
        ></div>

        <input
          type="search"
          onChange={filterFood}
          className="w-full rounded-md border border-gray-300 outline-none ring-0 my-4"
          placeholder="Search..."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {foods.map(food => (
            <FoodCard food={food} key={food.id} />
          ))}
        </div>
      </Container>

      <FoodForm isOpen={isCreateFormOpen} food={food} onClose={reset} action={action} refresh={fetchFoods} />
    </>
  );
};

export default Home;
