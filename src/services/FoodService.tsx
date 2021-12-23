import { Vector3 } from 'three';
import Food from '../models/Food';
import PointOfInterest from '../models/PointOfInterest';

export default class FoodService {
  private static dummy: Food[] = [
    new Food(
      '70552965-d750-48c2-9c70-be1ad63fc2b9',
      'Alo Rajma',
      'Rājmā[2] [raːdʒmaː] (Hindi: राजमा, Urdu: راجما), also known as rajmah, rāzmā, or lal lobia, is a vegetarian dish, originating from the Indian subcontinent, consisting of red kidney beans in a thick gravy with many Indian whole spices, and is usually served with rice. It is a part of regular diet in India, Nepal, Bangladesh and Punjab province of Pakistan.[1] The dish developed after the red kidney bean was brought to the Indian subcontinent from Mexico.[3] Rajma chawal is kidney beans served with boiled rice.',
      '/models/Alo Rajma.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      '8021765f-0347-49ff-ba90-955fdeb8ba63',
      'Asam Udeng',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/asam udeng.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      '892979cf-23c5-42dd-a60a-21b7e77e3f45',
      'Ayam Padang',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/ayam padang.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      'a7147808-2cb2-4b31-8231-d4ad3bf86170',
      'Ayam Tangkap',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/ayam_tangkap_med.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      '195ea4a1-400f-4544-a183-cf9b1b3c849a',
      'Ayangan',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/ayangan.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      '59618bc6-03e9-407e-af96-88e49be96742',
      'Rendang',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/rendang.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      '21c13683-b0fe-4c20-9693-13614d12aa2c',
      'Salad Padang',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/salad_padang.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      'bde17f81-2e30-4ecc-adef-8d4de9c67f6c',
      'Sushi',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/sushi.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
    ),
    new Food(
      'd8aea1f8-2676-4c1e-8c15-814f354083b3',
      'Timpan',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam libero quidem itaque eum esse officiis quis sit obcaecati inventore, ratione harum? Minus dolorum hic tenetur sequi! Repudiandae sequi mollitia adipisci.',
      '/models/timpan.glb',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://picsum.photos/200'
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
