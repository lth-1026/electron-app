<script setup>
defineProps(['tagName'])
</script>

<template>
  <div class="tag">
    {{ tagName }}
  </div>
</template>

<style scoped>
.tag {
  margin: 2px;
  padding: 5px;
  border-radius: 5px;
  background-color: #ffa50021;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.tag:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
