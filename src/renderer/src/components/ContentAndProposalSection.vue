<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps(['contents'])
const proposalArray = ref([])

function remove(event) {
  proposalArray.value = proposalArray.value.filter((item) => item.id !== event.target.id)
}
</script>

<template>
  <div class="content-section">
    <draggable
      class="dragArea list-group"
      :list="props.contents"
      :group="{ name: 'properties', pull: 'clone', put: false }"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="list-group-item card">
          {{ element.properties.이름.title[0].plain_text }}
        </div>
      </template>
    </draggable>
  </div>
  <div class="proposal-section">
    <draggable class="dragArea list-group" :list="proposalArray" group="properties" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item card">
          {{ element.properties.이름.title[0].plain_text }}
          <span :id="element.id" @click="remove"> x </span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
@import '@renderer/assets/card.css';

.content-section {
  flex: 1;
}

.proposal-section {
  flex: 1;
}
</style>
