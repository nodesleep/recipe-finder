<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useFoodStore } from "../stores/foodStore.ts";

const store = useFoodStore();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex items-center bg-neutral-50 rounded-full px-3 py-1 text-neutral-800 border border-neutral-400 text-sm"
  >
    <span>{{ props.name }}</span>
    <button @click="store.removeIngredient(props.name)" class="ml-auto">
      <XMarkIcon class="h-4 w-4" />
    </button>
  </div>
</template>
