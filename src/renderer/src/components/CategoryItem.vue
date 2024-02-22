<script setup>
defineProps(['categoryKey'])
</script>

<template>
  <div class="card">
    {{ categoryKey }}
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';
</style>
