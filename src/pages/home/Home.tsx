import { FunctionComponent, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import Card from '../../components/common/Card';
import Container from '../../components/common/Container';
import Navbar from '../../components/common/Navbar';
import pattern from '../../images/pattern.png';
import Food from '../../models/Food';
import FoodService from '../../services/FoodService';
import FoodCard from './components/FoodCard';

interface CategoryFoodsMapping {
  [category: string]: Food[];
}

const Home: FunctionComponent = () => {
  const [categoryFoodsMapping, setCategoryFoodsMapping] =
    useState<CategoryFoodsMapping>({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      const foods = await FoodService.getAll();
      const categorizedFoods = {} as CategoryFoodsMapping;
      foods.forEach((food) => {
        const categories = food.category.split(',');
        categories.forEach(
          (category) =>
            (categorizedFoods[category.trim()] = [
              ...(categorizedFoods[category.trim()] ?? []),
              food,
            ]),
        );
      });
      setCategoryFoodsMapping(categorizedFoods);
    };
    fetchFoods();
  }, []);

  const onFilterChange = async (e: any) => setFilter(e.target.value);
  const filterFn = (food: Food): boolean =>
    [food.name, food.category, food.description]
      .map((value) => value.toLowerCase())
      .some((value) => value.includes(filter.toLowerCase()));

  return (
    <>
      <Navbar />

      <Container>
        <div
          style={{ backgroundImage: `url(${pattern})` }}
          className='bg-primary-light-blue h-28 rounded-md mt-4 bg-contain bg-repeat'></div>

        <input
          type='search'
          onChange={onFilterChange}
          className='w-full rounded-md border border-gray-300 outline-none ring-0 my-4'
          placeholder='Search by name, category, or description...'
        />

        <div className='grid grid-cols-1 gap-4'>
          {Object.entries(categoryFoodsMapping).map(([category, foods]) => (
            <div key={category}>
              <h2 className='text-xl font-medium mb-4 capitalize'>
                {category}
              </h2>
              <div className='flex space-x-4 overflow-auto pb-3'>
                <If condition={foods.filter(filterFn).length}>
                  <Then>
                    {foods.filter(filterFn).map((food) => (
                      <FoodCard food={food} key={food.id} />
                    ))}
                  </Then>
                  <Else>
                    <h3 className='col-span-12 text-center text-lg font-medium'>
                      No foods.
                    </h3>
                  </Else>
                </If>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
