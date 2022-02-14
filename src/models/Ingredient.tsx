import { IngredientStep } from "./IngredientStep";

export class Ingredient {
  constructor(public header: string = '', public items: IngredientStep[] = []) {}
}
