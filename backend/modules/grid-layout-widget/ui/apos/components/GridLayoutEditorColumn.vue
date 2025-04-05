<template>
  <div class="column">
    <GridLayoutEditorHandle @change="expandLeft" className="grid-layout-editor-expand-left">
      &lt;
    </GridLayoutEditorHandle>
    <GridLayoutEditorHandle @change="move" className="grid-layout-editor-move">
      #
    </GridLayoutEditorHandle>
    <span v-if="allowRemove" @click.prevent="remove()" class="remove">x</span>
    <GridLayoutEditorHandle @change="expandRight" className="grid-layout-editor-expand-right">
      &gt;
    </GridLayoutEditorHandle>
  </div>
</template>

<script setup>

const props = defineProps([ 'allowRemove' ]);

const emit = defineEmits([ 'remove', 'move', 'expandLeft', 'expandRight' ]);
function remove() {
  emit('remove');
}
function move(event) {
  emit('move', event);
}
function expandLeft(event) {
  emit('expandLeft', event);
}
function expandRight(event) {
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
}
.remove {
  position: absolute;
  right: calc(50% - 1em);
  cursor: pointer;
}
</style>