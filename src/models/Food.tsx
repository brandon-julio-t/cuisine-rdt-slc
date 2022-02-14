import PointOfInterest from './PointOfInterest';

export default class Food {
  constructor(
    public id: string = '',
    public name: string = '',
    public category: string = '',
    public description: string = '',
    public modelUrl: string = '',
    public videoUrl: string = '',
    public imageUrl: string = '',
    public pointOfInterests: PointOfInterest[] = [],
    public cookingProcess: CookingProcess[],
    public ingredients: Ingredient[],
  ) {}
}

export class CookingProcess {
  constructor(public header: string = '', public steps: string[] = []) {}
}

export class Ingredient {
  constructor(
    public header: string = '',
    public items: IngredientStep[] = [],
  ) {}
}

export class IngredientStep {
  constructor(
    public name: string = '',
    public amount: string = '',
    public description: string = '',
  ) {}
}
