<script setup>
import CategoryItem from './CategoryItem.vue'

const emit = defineEmits(['clickedCategory'])

function clickCategory(clickedCategory) {
  console.log(clickedCategory)
  emit('clickedCategory', clickedCategory)
}
defineProps(['categoryKeys'])
</script>

<template>
  <div class="flex-item">
    <div v-for="categoryKey in categoryKeys" :key="categoryKey.indexOf">
      <CategoryItem :category-key="categoryKey" @click="() => clickCategory(categoryKey)" />
    </div>
  </div>
</template>

<style scoped>
div {
  flex: 1;
}
</style>
