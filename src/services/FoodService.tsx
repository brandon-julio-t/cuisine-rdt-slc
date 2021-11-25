import Food from '../models/Food';

export default class FoodService {
  private static dummy: Food[] = [
    new Food(
      '1',
      'Sandwich',
      'Sand. But which one?',
      '/models/sandwich/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/sandwich/preview.jpg',
      0.1,
    ),
    new Food(
      '2',
      'Curry',
      'Curry is goodies.',
      '/models/curry/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/curry/preview.jpg',
      1,
    ),
    new Food(
      '3',
      'Hotdog',
      'A dog that is hot.',
      '/models/hotdog/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/hotdog/preview.jpg',
      0.01,
    ),
    new Food(
      '4',
      'Toast',
      'Make a toast!',
      '/models/toast/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/toast/preview.jpg',
      0.1,
    ),
    new Food(
      '5',
      'Spaghetti',
      'It could be a food or a code style.',
      '/models/spaghetti/scene.gltf',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/spaghetti/preview.jpg',
      1,
    ),
    new Food(
      '6',
      'Red Rice with vegetables',
      "Red rice paired together with vegetables which brings nutritions to the body for RnD's long and hard day.",
      '/models/red_rice/Rice.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/red_rice/preview.jpg',
      1,
    ),
    new Food(
      '7',
      'Red Rice with vegetables 2',
      'Sequel to the first red rice with vegetables. Red Rice with vegetables 2 comes back with more nutrition than ever.',
      '/models/red_rice/Rice 2.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      '/models/red_rice/preview.jpg',
      1,
    ),
  ];

  public static async getAll(): Promise<Food[]> {
    return this.dummy;
  }

  public static async getOneById(id: string): Promise<Food | null> {
    return this.dummy.find((food) => food.id === id) || null;
  }

  public static async create(food: Food): Promise<boolean> {
    this.dummy.push(food);
    return true;
  }

  public static async update(food: Food): Promise<boolean> {
    const found = this.dummy.find((x) => x.id === food.id);
    if (!found) return false;
    const idx = this.dummy.indexOf(found);
    this.dummy[idx] = food;
    return true;
  }

  public static async delete(food: Food): Promise<boolean> {
    this.dummy = this.dummy.filter((x) => x.id !== food.id);
    return true;
  }
}
