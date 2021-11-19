import React, { useEffect, useState } from 'react';
import FoodService from '../components/services/food.service';
import Food from '../models/food.model';

interface Props {}

const Home = (props: Props) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    (async () => {
      setFoods(await FoodService.getAllFoods());
    })();
  }, []);

  return (
    <div>
      {foods.map(food => (
        <>
          <div>
            <div>{food.name}</div>
            <div>{food.description}</div>
            <div>{food.modelUrl}</div>
            <div>{food.videoUrl}</div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Home;
