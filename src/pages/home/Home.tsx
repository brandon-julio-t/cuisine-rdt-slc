import { FunctionComponent, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import Container from '../../components/common/Container';
import Navbar from '../../components/common/Navbar';
import pattern from '../../images/pattern.png';
import Food from '../../models/Food';
import CourseMappingService from '../../services/CourseMappingService';
import FoodService from '../../services/FoodService';
import FoodCard from './components/FoodCard';

interface FoodsMapping {
  [category: string]: Food[];
}

const Home: FunctionComponent = () => {
  const [foodsMapping, setFoodsMapping] = useState<FoodsMapping>({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFoods('course');
  }, []);

  const fetchFoods = async (showBy: 'category' | 'course') => {
    const foods = await FoodService.getAll();
    const courseMapping = await CourseMappingService.get();
    const categorizedFoods = {} as FoodsMapping;

    if (showBy === 'category') {
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
    } else {
      courseMapping.weeks.forEach((week) => {
        const category = `Week ${week.number} (${week.title})`;
        const actualFoods = foods.filter((f) => {
          return week.foods.some((wf) => wf.id === f.id);
        });
        categorizedFoods[category] = [
          ...(categorizedFoods[category] ?? []),
          ...actualFoods,
        ];
      });
    }
    setFoodsMapping(categorizedFoods);
  };

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

        <div className='mt-4 flex flex-col md:flex-row'>
          <span className='block mr-2'>Show by:</span>
          <div className='flex space-x-4'>
            <label className='flex items-center space-x-2'>
              <input
                type='radio'
                defaultChecked={true}
                onChange={() => fetchFoods('course')}
                name='show_by'
              />
              <span className='block'>Course session</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='radio'
                onChange={() => fetchFoods('category')}
                name='show_by'
              />
              <span className='block'>Category</span>
            </label>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 mt-4'>
          {Object.entries(foodsMapping).map(([category, foods]) => (
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
