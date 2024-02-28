<script setup>
import { ref } from 'vue'

const emit = defineEmits(['make-proposal'])
defineProps(['proposalLength'])

const doneCount = ref(0)
const isDownloading = ref(false)

function makeProposal(event) {
  console.log
  isDownloading.value = true
  console.log(event.target.id)
  const sendMsg = `make-${event.target.id}-proposal`
  doneCount.value = 0
  emit('make-proposal', sendMsg)
}

window.electron.ipcRenderer.on('download-done', () => doneCount.value++)
window.electron.ipcRenderer.on('proposal-process-done', () => {
  isDownloading.value = false
})
</script>

<template>
  <div class="footer">
    <div id="progress" :class="{ 'progress-downloading': isDownloading }">
      {{ doneCount }} / {{ proposalLength }}
    </div>
    <button id="pdf" class="button" :disabled="isDownloading" @click="makeProposal">
      pdf 제안서
    </button>
    <button id="ppt" class="button" :disabled="isDownloading" @click="makeProposal">
      ppt 제안서
    </button>
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
