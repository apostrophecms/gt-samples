<template>
  <div class="column">
    <GridLayoutEditorHandle @change="expandLeft" className="grid-layout-editor-expand-left" />
    <GridLayoutEditorHandle @change="move" className="grid-layout-editor-move" />
    <span v-if="allowRemove" @click.prevent="remove()" class="remove"><trash-can-outline /></span>
    <GridLayoutEditorHandle @change="expandRight" className="grid-layout-editor-expand-right" />
  </div>
</template>

<script setup>

const props = defineProps([ 'allowRemove' ]);

const emit = defineEmits([ 'remove', 'move', 'expandLeft', 'expandRight' ]);
function remove() {
  emit('remove');
}
function move(event) {
  console.log('move');
  emit('move', event);
}
function expandLeft(event) {
  console.log('el');
  emit('expandLeft', event);
}
function expandRight(event) {
  console.log('er');
  emit('expandRight', event);
}
</script>

<style scoped>
.column {
  width: 100%;
  height: 100%;
  background-color: #def;
  border: 1px solid #89a;
  border-bottom: none;
  border-radius: 0.625em 0.625em 0 0;
  padding-bottom: 2px;
}
.remove {
  position: absolute;
  left: calc(75% - 7px);
  cursor: pointer;
}
.material-design-icon {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
}
.material-design-icon > .material-design-icon__svg {
  height: 1em;
  width: 1em;
  fill: currentColor;
  position: absolute;
  bottom: -0.125em;
}
</style>