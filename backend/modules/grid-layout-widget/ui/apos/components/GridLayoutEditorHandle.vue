<template>
  <span
    ref="el"
    :class="`${className} handle`"
    tabindex="0"
    @pointerdown.prevent="down($event)"
    @pointermove.prevent="move($event)"
    @pointerup.prevent="up($event)">
    <slot />
  </span>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
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
    console.log('emitting change');
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
    console.log('committing');
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
    left: calc(50% - 0.5em);
  }
</style>