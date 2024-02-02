<script setup>
defineProps(['tagKey'])
//const tagName = ref(tag.value.name)
</script>

<template>
  <div class="card">
    {{ tagKey }}
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';
</style>
