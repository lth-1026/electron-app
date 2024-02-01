<script setup>
//import { ref, onMounted } from 'vue'
import TagItem from './TagItem.vue'

const emit = defineEmits(['clickedTag'])

function clickTag(clickedTag) {
  console.log(clickedTag)
  emit('clickedTag', clickedTag)
}
defineProps(['tagKeys'])
</script>

<template>
  <div class="flex-item">
    <div v-for="tagKey in tagKeys" :key="tagKey.indexOf">
      <TagItem :tag-key="tagKey" @click="() => clickTag(tagKey)" />
    </div>
  </div>
</template>

<style scoped>
div {
  flex: 1;
}
</style>
