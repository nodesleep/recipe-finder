<script setup lang="ts">
import { defineProps, computed } from "vue";
import { HandThumbUpIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  id: Number,
  title: {
    type: String,
    required: true,
    default: "Untitled Recipe",
  },
  image: String,
  likes: Number,
});

const truncateTitle = computed(() => {
  return props.title.length > 30
    ? `${props.title.slice(0, 30)}...`
    : props.title;
});
</script>

<template>
  <a
    :href="'https://spoonacular.com/recipes/' + props.title + '-' + props.id"
    target="_blank"
  >
    <div
      class="flex flex-col border border-gray-300 bg-white rounded hover:scale-105 hover:shadow-xl transition-all duration-150"
    >
      <!-- Image container with fixed height and width set to 1/3 of parent -->
      <div class="w-full h-48">
        <img
          :src="props.image"
          class="h-48 w-full object-cover"
          alt="Recipe Image"
        />
      </div>

      <!-- Title section -->
      <div class="flex items-center p-2">
        <h1 class="font-medium">{{ truncateTitle || "Untitled Recipe" }}</h1>
        <div class="flex items-center gap-2 text-neutral-500 ml-auto">
          <HandThumbUpIcon class="h-6 w-6" /> {{ props.likes }}
        </div>
      </div>
    </div>
  </a>
</template>
