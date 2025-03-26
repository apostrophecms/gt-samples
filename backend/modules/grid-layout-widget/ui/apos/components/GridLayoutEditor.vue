<template>
  <div :class="{ focused }">
    <div class="contextual-heading-controls">
      <GridLayoutEditorColumn v-for="(column, i) in columns"
        :allow-add-before="allowAddBefore(i)"
        :allow-add-after="allowAddAfter(i)"
        :col-start="column.colStart"
        :col-span="column.colSpan"
        :column-id="column._id"
        :allow-remove="allowRemove()"
        :column="column"
        :key="column._id"
        :stops-total="stopsTotal"
        @change="columnChange"
        @add-before="addBefore"
        @add-after="addAfter"
      />
    </div>
  </div>
</template>

<script setup>
// TODO npm install at project level
import { createId } from '@paralleldrive/cuid2';

const columns = ref([]);
const stops = apos.module['grid-layout-widget'].stops;
function allowAddBefore(i) {
  return columns.value.length < stops;
}
function allowAddAfter(i) {
  return (columns.value.length < stops) && ((i + 1) === columns.value.length);
}
function allowRemove() {
  return columns.value.length > 1;
}
// i is a column index in the array, not a stop number.
// If (i === columns.value.length) then the new column is added
// at the end, otherwise before column i
function addBefore(i) {
  const old = columns.value;
  const next = [];
  const freeLeft = old[0].colStart;
  const endRight = last(old).colStart + last(old).colSpan;
  const freeRight = stops - endRight;
  const borrowFromLeft = old.lastIndexOf(col => col.colSpan > 1, i);
  const borrowFromRight = old.indexOf(col => col.colSpan > 1, i);

  if ((i === 0) && (freeLeft > 0)) {
    // Take the empty space at far left
    next = [ newColumn(0, freeLeft), ...old ];
  } else if ((i === old.length) && (freeRight > 0)) {
    // Take the empty space at far right
    next = [ ...old, newColumn(endRight, freeRight) ];
  } else if (borrowFromLeft !== -1) {
    // TODO borrowing just one stop is a bit miserly in some scenarios
    const from = old[borrowFromLeft];
    // TODO a map that replaces one, then insert the new one
    next = [ ...old.map(col => (col._id === from._id) ? {
      ...from,
      colSpan: colSpan - 1
    } ? col)];
    // Don't forget to subtract the stop we borrowed from left
    next.splice(i, 0, newColumn(old[i].colStart + old[i].colSpan - 1, 1));
  } else if (borrowFromRight !== -1) {
    // TODO borrowing just one stop is a bit miserly in some scenarios
    const from = old[borrowFromRight];
    // TODO a map that replaces one, then insert the new one
    next = [ ...old.map(col => (col._id === from._id) ? {
      ...from,
      colSpan: colSpan - 1
    } ? col)];
    // We borrowed from the right so we don't need to subtract one
    next.splice(i, 0, newColumn(old[i].colStart + old[i].colSpan, 1));
  } else {
    throw new Error('addBefore should not be reachable if no stops are free or borrowable');
  }
}
function addAfter(i) {
  return addBefore(i + 1);
}
function newColumn(col, span) {
  return {
    _id: createId(),
    colStart: col,
    colSpan: span
  };
}

function last(a) {
  return a[a.length - 1];
}
</script>

<style lang="scss" scoped>
  .contextual-heading-controls {
    display: none;
    text-align: center;
  }
  .focused .contextual-heading-controls {
    display: block;
  }
  .contextual-heading-controls button {
    font-size: 10px;
  }
  button.active {
    background-color: red;
    color: white;
  }
  .width-25 {
    width: 36px;
    height: 24px;
  }
  .width-50 {
    width: 72px;
    height: 24px;
  }
  .width-75 {
    width: 96px;
    height: 24px;
  }
  .width-100 {
    width: 144px;
    height: 24px;
  }
</style>