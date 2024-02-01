<script setup>
import ContentItem from './ContentItem.vue'
defineProps(['contents'])
</script>

<template>
  <div>
    <div v-for="content in contents" :key="content.indexOf">
      <ContentItem :content="content" />
    </div>
  </div>
</template>

<style scoped>
div {
  flex: 1;
}
</style>
