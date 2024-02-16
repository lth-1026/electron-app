<script setup>
defineEmits(['make-proposal'])
</script>

<template>
  <div class="footer">
    <div @click="$emit('make-proposal')">버튼</div>
  </div>
</template>

<style scoped>
.footer {
  background-color: bisque;
  grid-column: 1 / 3;
  height: 50px;
}
</style>
