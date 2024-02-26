<script setup>
defineEmits(['make-proposal'])
</script>

<template>
  <div class="footer">
    <button class="button" @click="$emit('make-proposal')">제안서 생성하기</button>
  </div>
</template>

<style scoped>
@import '@renderer/assets/button.css';

.footer {
  background-color: bisque;
  grid-column: 1 / 3;
  height: 50px;
  display: flex;
  justify-content: flex-end;
}
</style>
