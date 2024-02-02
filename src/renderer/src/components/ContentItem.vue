<script setup>
defineProps(['content'])
//const tagName = ref(tag.value.name)
</script>

<template>
  <div class="card">
    {{ content.properties.이름.title[0].plain_text }}
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';
</style>
