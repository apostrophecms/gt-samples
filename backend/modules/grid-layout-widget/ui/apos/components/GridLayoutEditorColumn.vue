<template>
  <div class="column" :style="`left: ${x}px; width: ${width}px`">
    <button v-if="allowAddBefore" @click="addBefore" class="add-left">+</button>
    <GridLayoutEditorHandle @change="expandLeft" className="grid-layout-editor-expand-left">
      &lt;
    </GridLayoutEditorHandle>
    <GridLayoutEditorHandle @change="move" className="grid-layout-editor-move">
      #
    </GridLayoutEditorHandle>
    <button v-if="allowRemove" @click.prevent="remove()" class="remove">x</button>
    <GridLayoutEditorHandle @change="expandRight" className="grid-layout-editor-expand-right">
      &gt;
    </GridLayoutEditorHandle>
    <button v-if="allowAddAfter" @click="addAfter" class="add-right">+</button>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';

const props = defineProps([ 'colStart', 'colSpan', 'stopsTotal', 'stopSize', 'allowAddBefore', 'allowAddAfter', 'allowRemove', 'generation' ]);

const x = ref(null);
const width = ref(null);

computeX();
computeWidth();

watch(() => props.colStart, () => {
  computeX();
});
watch(() => props.colSpan, () => {
  computeWidth();
});
watch(() => props.stopSize, () => {
  computeX();
  computeWidth();
});
// Used to deny changes
watch(() => props.generation, () => {
  computeX();
  computeWidth();
});

function computeX() {
  x.value = props.colStart * props.stopSize;
}

function computeWidth() {
  width.value = props.stopSize * props.colSpan;
}

const emit = defineEmits([ 'remove', 'change', 'addBefore', 'addAfter' ]);
function addBefore() {
  emit('addBefore');
}
function addAfter() {
  emit('addAfter');
}
function expandLeft({ delta, commit }) {
  x.value += delta;
  width.value -= delta;
  if (commit) {
    change();
  }
}
function expandRight({ delta, commit }) {
  width.value += delta;
  if (commit) {
    change();
  }
}
function move({ delta, commit }) {
  x.value += delta;
  if (commit) {
    change();
  }
}
function remove() {
  emit('remove');
}
function change() {
  const colStart = snap(x.value, 0, props.stopsTotal - 1);
  const colSpan = snap(width.value, 1, props.stopsTotal);
  emit('change', {
    colStart,
    colSpan
  });
}
function snap(x, min, max) {
  return Math.max(Math.min(Math.round(x / props.stopSize), max), min);  
}
</script>

<style scoped>
.column {
  position: absolute;
}
.add-left {
  position: absolute;
  left: 0;
}
.add-right {
  position: absolute;
  right: -1em;
}
.remove {
  position: absolute;
  right: calc(50% - 1em);
}
</style>