import { defineStore } from "pinia";
import { getRecipesByIngredients } from "../services";
import type { Recipe } from "../models";

export const useFoodStore = defineStore("food", {
  state: () => ({
    foodAvailable: [] as string[],
    recipes: [] as string[],
    isLoading: false,
  }),
  actions: {
    // Fetch recipes based on the ingredients
    async fetchRecipes() {
      // Set isLoading to true to show the loading spinner
      this.isLoading = true;
      try {
        // Call formatListParams to format the API params
        this.formatListParams();

        // Call the service to fetch recipes based on ingredients
        // Then sort by popularity before populating the recipes array
        const res = await getRecipesByIngredients(this.foodAvailable);
        this.recipes = res.sort((a: Recipe, b: Recipe) => {
          return b.likes - a.likes;
        });

        // Set isLoading to false to hide the loading spinner
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },

    // Format the ingredients list to match the API's format (replace spaces with '+')
    formatListParams() {
      this.foodAvailable = this.foodAvailable.map((item) =>
        item.toLowerCase().replace(/\s+/g, "+")
      );
    },

    // Remove an ingredient from the foodAvailable array
    removeIngredient(ingredient: string) {
      this.foodAvailable = this.foodAvailable.filter(
        (item) => item !== ingredient
      );
    },

    // Add an ingredient to the foodAvailable array
    addIngredient(ingredient: string) {
      this.foodAvailable.push(ingredient);
      this.formatListParams();
    },

    // Clear the foodAvailable array
    clearIngredients() {
      this.foodAvailable = [];
    },
  },
});
