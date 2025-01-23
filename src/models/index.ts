export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: string[];
  usedIngredients?: string[];
  unusedIngredients?: string[];
  likes: number;
}
