<!-- eslint-disable vue/require-prop-types -->
<script setup>
import { onMounted, ref, toRaw } from 'vue'

import draggable from 'vuedraggable'
import Tag from './Tag.vue'

const emit = defineEmits(['changeTag'])
const props = defineProps(['contents'])

const tags = defineModel('tags')
const proposalArray = defineModel('proposalArray')

function addProposalArray(event) {
  const element = event.target.__draggable_context.element
  const item = props.contents.find((item) => item.id == element.id)
  console.log(item)
  proposalArray.value.push(item)
}

function remove(event) {
  proposalArray.value = proposalArray.value.filter((item) => item.id !== event.target.id)
}

function changeTag() {
  emit('changeTag', tags)
}

function removeAllTags() {
  tags.value.forEach((tag) => {
    tag.selected = false
  })
  changeTag()
}
</script>

<template>
  <div id="flex-container">
    <!-- <div>
      <div v-for="tag in tags" :key="tag.name">
        <input
          :id="tag.name"
          v-model="tag.selected"
          type="checkbox"
          style="display: none"
          @change="changeTag"
        />
        <label :for="tag.name"> <Tag class="tag" :tag-name="tag.name" /></label>
      </div>
      <button @click="removeAllTags">태그 지우기</button>
    </div> -->
    <div class="content-section">
      <div class="tag-section">
        <div class="tag-contents">
          <div v-for="tag in tags" :key="tag.name">
            <input
              :id="tag.name"
              v-model="tag.selected"
              type="checkbox"
              style="display: none"
              @change="changeTag"
            />
            <label :for="tag.name"> <Tag class="tag" :tag-name="tag.name" /></label>
          </div>
        </div>
        <button @click="removeAllTags">태그 지우기</button>
      </div>
      <draggable
        class="dragArea list-group"
        :list="props.contents"
        :group="{ name: 'properties', pull: 'clone', put: false }"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item card" @click="addProposalArray">
            {{ element.properties.name.title[0].plain_text }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="proposal-section">
      <draggable class="dragArea list-group" :list="proposalArray" group="properties" item-key="id">
        <template #item="{ element }">
          <div class="list-group-item card proposal-card">
            {{ element.properties.name.title[0].plain_text }}
            <button :id="element.id" @click="remove">삭제</button>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';
@import '@renderer/assets/button.css';

#flex-container {
  display: flex;
  flex-direction: row;
}
.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.proposal-section {
  flex: 1;
}

.tag-section {
  display: flex;
  justify-content: space-between;
}

.tag-contents {
  display: flex;
  flex-wrap: wrap;
}

.proposal-card {
  display: flex;
  justify-content: space-between;
}

.dragArea {
  overflow: scroll;
  height: 100%;
}

input:checked + label :deep(.tag) {
  background-color: orange;
}
</style>
