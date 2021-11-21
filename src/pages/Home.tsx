import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Container from '../components/common/Container';
import FoodService from '../services/FoodService';
import Food from '../models/Food';

interface Props {}

const Home = (props: Props) => {
  const foods = useFoods();

  return (
    <Container>
      <h1 className="my-4 text-3xl font-bold">Menus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map(food => (
          <Link to={`/detail/${food.id}`} key={food.id}>
            <Card>
              <h2 className="text-xl font-bold">{food.name}</h2>
              <div>{food.description}</div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
};

function useFoods(): Food[] {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    (async () => {
      setFoods(await FoodService.getAll());
    })();
  }, []);

  return foods;
}

export default Home;
