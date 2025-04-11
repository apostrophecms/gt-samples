<template>
  <div class="gap">
    <span v-if="allowAdd" @click="add" class="add">
      <plus-circle-outline />
    </span>
  </div>
</template>

<script setup>
const props = defineProps([ 'allowAdd' ]);
const emit = defineEmits([ 'add' ]);
function add() {
  emit('add');
}
</script>

<style scoped>
.gap {
  width: 100%;
  text-align: center;
}
.add-left {
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