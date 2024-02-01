<script setup lang="ts">
import Versions from './components/Versions.vue'
import Child from './components/Child.vue'
import Tag from './components/TagSection.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
// Notion 데이터를 요청
const ipcNotionData = () => window.electron.ipcRenderer.send('get-notion-data')
</script>

<template>
  <div class="container">
    <Tag />
    <Tag />
  </div>
  <!-- <Child />
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions /> -->
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
</style>
