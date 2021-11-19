import Food from "../../models/food.model";

export default class FoodService {

  public static async getAllFoods(): Promise<Food[]> {
    const dummy: Food[] = [
      new Food(
        'Chicken and Waffles',
        'chicken is good but waffles are goodies too.',
        '/models/chicken-and-waffles/scene.gltf',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ),
      new Food(
        'Curry',
        'Curry is goodies.',
        '/models/curry/scene.gltf',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ),
      new Food(
        'Hotdog',
        'A dog that is hot.',
        '/models/hotdog/scene.gltf',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ),
      new Food(
        'Orange',
        'Orang but with e.',
        '/models/orange/scene.gltf',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ),
      new Food(
        'Spaghetti',
        'It could be a food or a code style.',
        '/models/spaghetti/scene.gltf',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ),
    ];

    return dummy;
  }

}
