import { Vector3 } from 'three';
import Food from '../models/Food';
import PointOfInterest from '../models/PointOfInterest';
import foodJson from '../../data/foods.json';

export default class FoodService {
  private static foods: Food[] = foodJson.foods;

  public static async getAll(): Promise<Food[]> {
    return this.foods;
  }

  public static async getOneById(id: string): Promise<Food | null> {
    return this.foods.find((food) => food.id === id) || null;
  }

  public static async create(food: Food): Promise<boolean> {
    this.foods.push(food);
    return true;
  }

  public static async update(food: Food): Promise<boolean> {
    const found = this.foods.find((x) => x.id === food.id);
    if (!found) return false;
    const idx = this.foods.indexOf(found);
    this.foods[idx] = food;
    return true;
  }

  public static async delete(food: Food): Promise<boolean> {
    this.foods = this.foods.filter((x) => x.id !== food.id);
    return true;
  }
}
