<template>
  <div class="zone" :style="`left: ${x}px; width: ${width}px`">
    <GridLayoutEditorColumn
      v-if="zone.type === 'column'"
      :allow-remove="zone.allowRemove"
      @remove="emit('remove', $event)"
      @expand-left="expandLeft"
      @expand-right="expandRight"
      @move="move"
    />
    <GridLayoutEditorGap
      v-else
      @add="add"
    />
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';

const props = defineProps([ 'zone', 'stopsTotal', 'stopSize', 'generation' ]);

const emit = defineEmits([ 'remove', 'change', 'add' ]);

const x = ref(null);
const width = ref(null);

computeX();
computeWidth();

watch(() => props.zone.colStart, () => {
  computeX();
});
watch(() => props.zone.colSpan, () => {
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
  x.value = props.zone.colStart * props.stopSize;
}

function computeWidth() {
  width.value = props.stopSize * props.zone.colSpan;
}

function add() {
  emit('add');
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
.zone {
  position: absolute;
  height: 1.25em;
}
</style>