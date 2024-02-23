<!-- eslint-disable vue/require-prop-types -->
<script setup>
import draggable from 'vuedraggable'

const emit = defineEmits(['changeTag'])
const props = defineProps(['contents'])

const tags = defineModel('tags')
const proposalArray = defineModel('proposalArray')

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
    <div>
      <li v-for="tag in tags" :key="tag.name">
        <input v-model="tag.selected" type="checkbox" @change="changeTag" />
        {{ tag.name }}
      </li>
      <button @click="removeAllTags">태그 지우기</button>
    </div>
    <div class="content-section">
      <draggable
        class="dragArea list-group"
        :list="props.contents"
        :group="{ name: 'properties', pull: 'clone', put: false }"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="list-group-item card">
            {{ element.properties.name.title[0].plain_text }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="proposal-section">
      <draggable class="dragArea list-group" :list="proposalArray" group="properties" item-key="id">
        <template #item="{ element }">
          <div class="list-group-item card">
            {{ element.properties.name.title[0].plain_text }}
            <span :id="element.id" @click="remove"> x </span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';

#flex-container {
  display: flex;
  flex-direction: row;
}
.content-section {
  flex: 1;
  overflow: scroll;
}

.proposal-section {
  flex: 1;
  overflow: scroll;
}
</style>
