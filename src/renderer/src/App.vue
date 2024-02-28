<script setup>
import Category from './components/CategorySection.vue'
import ContentAndProposalSection from './components/ContentAndProposalSection.vue'
import GenerationSection from './components/GenerationSection.vue'

import { onMounted, ref, toRaw } from 'vue'

const dataMap = ref()
const categoryKeys = ref()
const categoryData = ref()
const selectedCategory = ref()
const tags = ref()
const proposalArray = ref([])
const proposalLength = ref()

//컴포넌트가 마운트되었을 때의 동작 설정
onMounted(() => {
  // 추가적인 초기화 로직 등이 필요하다면 여기에 작성
  // Notion 데이터를 받아와서 화면에 표시
  window.electron.ipcRenderer.on('notion-data', (event, data) => {
    console.log(data)
    dataMap.value = data
    categoryKeys.value = Array.from(data.keys())
  })
})

function getCategoryData(category) {
  selectedCategory.value = category

  const tagKeys = Array.from(dataMap.value.get(category).keys())
  tags.value = tagKeys.map((tag) => ({
    name: tag,
    selected: true
  }))
  getDataByTag(category, tags)
}

function changeTag(changedtags) {
  getDataByTag(selectedCategory.value, changedtags)
}

//태그에 해당하는 데이터 가져오기
function getDataByTag(category, tags) {
  const data = []
  const selectedTags = tags.value
    .filter((tag) => tag.selected)
    .map((tag) => {
      data.push(...dataMap.value.get(category).get(tag.name))
    })
  console.log(selectedTags)

  categoryData.value = data
}

//제안서 생성하기
function makeProposal(sendMsg) {
  console.log(toRaw(proposalArray.value))
  proposalLength.value = proposalArray.value.length
  window.electron.ipcRenderer.send(sendMsg, toRaw(proposalArray.value))
}
</script>

<template>
  <div class="container">
    <Category :category-keys="categoryKeys" @clicked-category="getCategoryData" />
    <ContentAndProposalSection
      v-model:proposalArray="proposalArray"
      v-model:tags="tags"
      :contents="categoryData"
      @change-tag="changeTag"
    />
    <GenerationSection :proposal-length="proposalLength" @make-proposal="makeProposal" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: calc(100vh - 50px) max-content;
  background-color: #f3f3f3;
}
</style>
