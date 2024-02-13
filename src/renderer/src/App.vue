<script setup>
//import Versions from './components/Versions.vue'
//import Child from './components/Child.vue'
import Tag from './components/TagSection.vue'
import ContentAndProposalSection from './components/ContentAndProposalSection.vue'
import GenerationSection from './components/GenerationSection.vue'

import { onMounted, ref } from 'vue'

//const ipcHandle = () => window.electron.ipcRenderer.send('ping')
// Notion 데이터를 요청
//const ipcNotionData = () => window.electron.ipcRenderer.send('get-notion-data')

let map
const dataMap = ref()
const tagKeys = ref()
const tagName = ref()

//컴포넌트가 마운트되었을 때의 동작 설정
onMounted(() => {
  // 추가적인 초기화 로직 등이 필요하다면 여기에 작성
  // Notion 데이터를 받아와서 화면에 표시
  window.electron.ipcRenderer.on('notion-data', (event, data) => {
    map = data
    console.log(data)
    dataMap.value = data
    tagKeys.value = Array.from(data.keys())
    //tagKeys.value = Array.from(data.keys())
  })
})
</script>

<template>
  <div class="container">
    <Tag :tag-keys="tagKeys" @clicked-tag="(name) => (tagName = Array.from(map.get(name)))" />
    <ContentAndProposalSection :contents="tagName" />
    <GenerationSection />
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
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 50px;
}
</style>
