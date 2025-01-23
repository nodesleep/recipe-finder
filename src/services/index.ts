// services/recipeService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

export const getRecipesByIngredients = async (ingredients: string[]) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ingredients: ingredients.join(","),
        number: 12,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
