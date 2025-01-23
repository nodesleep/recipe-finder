import { defineStore } from "pinia";
import { getRecipesByIngredients } from "../services";
import type { Recipe } from "../models";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foodAvailable: [] as string[],
    recipes: [] as Recipe[],
    isLoading: false,
  }),
  actions: {
    // Fetch recipes based on the ingredients
    async fetchRecipes() {
      this.isLoading = true;
      try {
        this.formatListParams();

        const res: Recipe[] = await getRecipesByIngredients(this.foodAvailable);

        this.recipes = res.sort((a: Recipe, b: Recipe) => b.likes - a.likes);

        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching recipes:", error);
        this.isLoading = false;
      }
    },

    formatListParams() {
      this.foodAvailable = this.foodAvailable.map((item) =>
        item.toLowerCase().replace(/\s+/g, "+")
      );
    },

    removeIngredient(ingredient: string) {
      this.foodAvailable = this.foodAvailable.filter(
        (item) => item !== ingredient
      );
    },

    addIngredient(ingredient: string) {
      this.foodAvailable.push(ingredient);
      this.formatListParams();
    },

    clearIngredients() {
      this.foodAvailable = [];
    },
  },
});
