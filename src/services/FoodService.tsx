import Food from '../models/Food';

export default class FoodService {
  private static dummy: Food[] = [
    new Food(
      '1',
      'Sandwich',
      'Sand. But which one?',
      '/models/sandwich/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      0.1
    ),
    new Food(
      '2',
      'Curry',
      'Curry is goodies.',
      '/models/curry/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      1
    ),
    new Food(
      '3',
      'Hotdog',
      'A dog that is hot.',
      '/models/hotdog/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      0.01
    ),
    new Food(
      '4',
      'Toast',
      'Make a toast!',
      '/models/toast/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      0.1
    ),
    new Food(
      '5',
      'Spaghetti',
      'It could be a food or a code style.',
      '/models/spaghetti/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      1
    ),
    new Food(
      '6',
      'Red Rice with vegetables',
      'Red rice paired together with vegetables which brings nutritions to the body for RnD\'s long and hard day.',
      '/models/Rice 2.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      1
    ),
  ];

  public static async getAll(): Promise<Food[]> {
    return this.dummy;
  }

  public static async getOneById(id: string): Promise<Food | null> {
    return this.dummy.find(food => food.id === id) || null;
  }

  public static async create(food: Food): Promise<boolean> {
    this.dummy.push(food);
    return true;
  }

  public static async update(food: Food): Promise<boolean> {
    const found = this.dummy.find(x => x.id === food.id);
    if (!found) return false;
    const idx = this.dummy.indexOf(found);
    this.dummy[idx] = food;
    return true;
  }

  public static async delete(food: Food): Promise<boolean> {
    this.dummy = this.dummy.filter(x => x.id !== food.id);
    return true;
  }
}
