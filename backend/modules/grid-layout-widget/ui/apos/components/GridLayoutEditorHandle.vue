<template>
  <span
    class="grid-layout-editor-handle"
    tabindex="0"
    @pointerdown.prevent="down($event)"
    @pointermove.prevent="move($event)"
    @pointerup.prevent="up($event)">
    <slot />
  </span>
</template>

<script setup>
  const props = defineProps([ 'growLeft', 'growRight' ]);
  const emit = defineEvents([ 'change' ]);
  let dx, dy;
  function down(event) {
    if (!event.isPrimary) {
      return;
    }
    setPointerCapture(event.pointerId);
    dx = event.pageX;
    dy = event.pageY;
  }
  function move(event) {
    if (!event.isPrimary) {
      return;
    }
    emit('change', {
      delta: event.pageX - dx,
      commit: false
    });
  }
  function up(event) {
    if (!event.isPrimary) {
      return;
    }
    emit('change', {
      delta: event.pageX - dx,
      commit: true
    });
  }

</script>

<style>
.grid-layout-editor-handle {
  position: absolute;
}
</style>
