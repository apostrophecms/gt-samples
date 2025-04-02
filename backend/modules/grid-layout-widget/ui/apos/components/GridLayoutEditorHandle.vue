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
  function down(event) {
    if (!event.isPrimary) {
      return;
    }
    el.value.setPointerCapture(event.pointerId);
    dx = event.pageX;
  }
  function move(event) {
    if (!event.isPrimary) {
      return;
    }
    console.log('emitting change');
    emit('change', {
      delta: event.pageX - dx,
      commit: false
    });
  }
  function up(event) {
    if (!event.isPrimary) {
      return;
    }
    el.value.releasePointerCapture(event.pointerId);
    emit('change', {
      delta: event.pageX - dx,
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
    left: 2em;
  }
  .grid-layout-editor-expand-right {
    position: absolute;
    right: 3em;
  }
  .grid-layout-editor-move {
    position: absolute;
    left: calc(50% - 0.5em);
  }
</style>