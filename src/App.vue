<script setup lang="ts">
import { ref } from "vue";
import { useFoodStore } from "./stores/foodStore.ts";
import { ArrowPathIcon, PlusIcon } from "@heroicons/vue/24/solid";
import RecipeCard from "./components/RecipeCard.vue";
import IngredientPill from "./components/IngredientPill.vue";

const store = useFoodStore();

const newIngredient = ref<string>("");

const addIngredient = (ingredient: string) => {
  store.addIngredient(ingredient);
  newIngredient.value = "";
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="w-full lg:w-[70%] h-full mx-auto p-6 flex flex-col">
      <h1 class="text-4xl font-bold text-green-900 font-cursive mb-12">
        Recipe Finder
      </h1>
      <h1 class="text-2xl font-semibold uppercase">Ingredients</h1>
      <div class="flex items-center pt-3 w-full">
        <input
          v-model="newIngredient"
          @keyup.enter="addIngredient(newIngredient)"
          type="text"
          class="border border-gray-800 rounded w-[300px] p-2 absolute"
          placeholder="Enter ingredient"
        />
        <PlusIcon
          class="h-6 w-6 cursor-pointer relative left-[270px]"
          @click="addIngredient(newIngredient)"
        />
        <button
          class="bg-green-600 border border-green-800 text-white px-4 py-2 rounded hover:scale-105 hover:shadow-xl transition-all duration-150 ml-auto"
          @click="store.fetchRecipes()"
        >
          Generate
        </button>
      </div>

      <div class="flex flex-col pt-3">
        <div class="flex flex-wrap items-center gap-2 mt-3">
          <IngredientPill
            :name="ingredient || ''"
            v-for="ingredient in store.foodAvailable"
          />
        </div>
        <div class="mt-3">
          <button
            v-if="store.foodAvailable.length > 0"
            class="text-black text-sm font-semibold"
            @click="store.clearIngredients()"
          >
            Clear All
          </button>
        </div>
      </div>

      <hr class="my-6" />

      <div
        class="flex-1 flex items-center justify-center"
        v-if="!store.isLoading && store.recipes.length === 0"
      >
        <h1 class="text-2xl font-semibold tracking-tight">
          Add ingredients and click the generate button
        </h1>
      </div>

      <div
        class="flex-1 flex items-center justify-center"
        v-if="store.isLoading"
      >
        <ArrowPathIcon class="h-24 w-24 text-green-600 animate-spin" />
      </div>

      <!-- Recipes section -->
      <div v-if="store.recipes.length > 0 && !store.isLoading">
        <h1 class="text-2xl font-semibold uppercase mt-12">Recipes</h1>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5 mb-12"
        >
          <div v-for="recipe in store.recipes" :key="recipe.id">
            <RecipeCard
              :title="recipe.title"
              :image="recipe.image"
              :id="recipe.id"
              :likes="recipe.likes"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
