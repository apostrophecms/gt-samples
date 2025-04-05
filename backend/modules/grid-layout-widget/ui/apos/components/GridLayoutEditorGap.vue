<template>
  <div class="gap">
    <span @click="add" class="add">+</span>
  </div>
</template>

<script setup>
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
</style>