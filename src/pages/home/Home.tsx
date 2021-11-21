import { Dialog } from '@headlessui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import CreateForm from './components/CreateForm';

interface Props {}

const Home = (props: Props) => {
  const [action, setAction] = useState<'Create' | 'Update'>('Create');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [food, setFood] = useState<Food | null>(null);
  const [foods, setFoods] = useFoods();

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
    setFoods(foods.filter(x => x.id !== food.id));
    reset();
  };

  return (
    <>
      <Container>
        <h1 className="my-4 text-3xl font-medium">Menus</h1>
        <div className="my-4">
          <Button onClick={onCreate}>Create</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foods.map(food => (
            <Card key={food.id}>
              <h2 className="text-lg font-medium">{food.name}</h2>
              <div>{food.description}</div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                <Link to={`/detail/${food.id}`}>
                  <Button className="w-full">View</Button>
                </Link>
                <Button onClick={() => onUpdate(food)}>Update</Button>
                <Button onClick={() => onDelete(food)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      <CreateForm isOpen={isCreateFormOpen} food={food} onClose={reset} action={action} />
    </>
  );
};

function useFoods(): [Food[], (foods: Food[]) => void] {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    (async () => {
      setFoods(await FoodService.getAll());
    })();
  }, []);

  return [foods, setFoods];
}

export default Home;
