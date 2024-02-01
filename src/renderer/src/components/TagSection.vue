<script setup>
import { ref, onMounted } from 'vue'
import TagItem from './TagItem.vue'

const tagNames = ref('test')

//컴포넌트가 마운트되었을 때의 동작 설정
onMounted(() => {
  // 추가적인 초기화 로직 등이 필요하다면 여기에 작성
  // Notion 데이터를 받아와서 화면에 표시
  window.electron.ipcRenderer.on('notion-data', (event, data) => {
    tagNames.value = data
    console.log(data)
  })
})
</script>

<template>
  <div class="flex-item">
    <div v-for="tagName in tagNames" :key="tagName.indexOf">
      <TagItem :name="tagName" />
    </div>
  </div>
</template>

<style scoped>
/* 스타일링 */
div {
  flex: 1;
}
</style>
