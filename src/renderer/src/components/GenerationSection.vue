<script setup>
import { ref } from 'vue'

const emit = defineEmits(['make-proposal'])
defineProps(['proposalLength'])

const doneCount = ref(0)
const isDownloading = ref(false)

function makeProposal(event) {
  console.log
  isDownloading.value = true
  console.log(event.target)
  doneCount.value = 0
  emit('make-proposal')
}

window.electron.ipcRenderer.on('ppt-done', () => doneCount.value++)
window.electron.ipcRenderer.on('ppt-download-done', () => {
  isDownloading.value = false
})
</script>

<template>
  <div class="footer">
    <div id="progress" :class="{ 'progress-downloading': isDownloading }">
      {{ doneCount }} / {{ proposalLength }}
    </div>
    <button class="button" :disabled="isDownloading" @click="makeProposal">제안서 생성하기</button>
  </div>
</template>

<style scoped>
@import '@renderer/assets/button.css';

.footer {
  background-color: lightgray;
  grid-column: 1 / 3;
  height: 50px;
  display: flex;
  justify-content: flex-end;
}

#progress {
  font-size: large;
  display: none;
  margin: 10px;
}

.progress-downloading {
  display: flex !important;
  align-items: center;
}
</style>
