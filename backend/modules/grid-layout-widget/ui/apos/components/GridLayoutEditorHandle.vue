<template>
  <span
    ref="el"
    :class="`${className} handle`"
    tabindex="0"
    @pointerdown.prevent="down($event)"
    @pointermove.prevent="move($event)"
    @pointerup.prevent="up($event)">
    <drag />
  </span>
</template>

<script setup>
  import { ref } from 'vue';
  const emit = defineEmits([ 'change' ]);
  defineProps([ 'className' ]);

  const el = ref(null);

  let dx;
  let dragging = false;
  function down(event) {
    if (!event.isPrimary) {
      return;
    }
    dragging = true;
    el.value.setPointerCapture(event.pointerId);
    dx = event.pageX;
  }
  function move(event) {
    if (!event.isPrimary) {
      return;
    }
    if (!dragging) {
      return;
    }
    const delta = event.pageX - dx;
    dx = event.pageX;
    emit('change', {
      delta,
      commit: false
    });
  }
  function up(event) {
    if (!event.isPrimary) {
      return;
    }
    el.value.releasePointerCapture(event.pointerId);
    dragging = false;
    const delta = event.pageX - dx;
    dx = event.pageX;
    emit('change', {
      delta,
      commit: true
    });
  }

</script>

<style scoped>
  .handle {
    position: absolute;
    cursor: grab;
    width: 16px;
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

<style>
  .grid-layout-editor-expand-left {
    position: absolute;
    left: 0;
  }
  .grid-layout-editor-expand-right {
    position: absolute;
    right: 0;
  }
  .grid-layout-editor-move {
    position: absolute;
    left: calc(50% - 8px);
  }
</style>