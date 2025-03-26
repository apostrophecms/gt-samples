<template>
  <div :style="left: `${x}px`">
    <button v-if="allowAddBefore" @click="addBefore">+</button>
    <GridLayoutEditorHandle @change="expandLeft">
      &lt;
    </GridLayoutEditorHandle>
    <GridLayoutEditorHandle @change="move">
      #
    </GridLayoutEditorHandle>
    <button v-if="allowRemove" @click.prevent="remove()">x</button>
    <GridLayoutEditorHandle @change="expandRight">
      &gt;
    </GridLayoutEditorHandle>
    <button v-if="allowAddAfter" @click="addAfter">+</button>
  </div>
</template>

<script setup>
const props = defineProps([ 'colStart', 'colSpan', 'stopSize', 'allowAddBefore', 'allowAddAfter', 'allowRemove' ]);
import { ref } from 'vue';
const x = ref(props.start * stopSize);
const width = ref(stopSize * span);
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
  const colStart = snap(x.value, 0, stopsTotal - 1);
  cont colSpan = snap(x.width, 1, stopsTotal);
  emit('change', {
    colStart,
    colSpan
  });
}
function snap(x, min, max) {
  return Math.max(Math.min(Math.round(x.value / stopSize), max), min);  
}
</script>
