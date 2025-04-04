<template>
  <div ref="el" :class="{ focused }" :style="`--stops: ${stopsTotal}`">
    <div class="contextual-heading-controls">
      <div class="stops">
        <div v-for="i in stopsTotal" class="stop"></div>
      </div>
      <div class="columns">
        <GridLayoutEditorColumn v-for="(column, i) in columns"
          :allow-add-before="allowAddBefore(i)"
          :allow-add-after="allowAddAfter(i)"
          :col-start="column.colStart"
          :col-span="column.colSpan"
          :column-id="column._id"
          :allow-remove="allowRemove()"
          :key="column._id"
          :stop-size="stopSize"
          :stops-total="stopsTotal"
          :generation="generation"
          @change="columnChange(i, $event.colStart, $event.colSpan)"
          @add-before="addBefore(i)"
          @add-after="addAfter(i)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO npm install at project level
import { createId } from '@paralleldrive/cuid2';

import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps([ 'modelValue', 'options', 'focused' ]);

const el = ref(null);
const generation = ref(0);
const stopSize = ref(null);
const stopsTotal = props.options.stops || apos.modules['grid-layout-widget'].stops;
const columns = ref([ newColumn(0, stopsTotal) ]);

let resizeObserver;

onMounted(() => {
  stopSize.value = el.value.getBoundingClientRect().width / stopsTotal;
  console.log(`--> ${stopSize.value}`);
  resizeObserver = new ResizeObserver(entries => {
    console.log(':::', entries);
    const entry = entries[0];
    stopSize.value = entry.contentRect.width / stopsTotal;
    console.log(`==> ${stopSize.value}`);
  });
  resizeObserver.observe(el.value);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

function allowAddBefore(i) {
  return columns.value.length < stopsTotal;
}
function allowAddAfter(i) {
  return (columns.value.length < stopsTotal) && ((i + 1) === columns.value.length);
}
function allowRemove() {
  return columns.value.length > 1;
}
// i is a column index in the array, not a stop number.
// If (i === columns.value.length) then the new column is added
// at the end, otherwise before column i
function addBefore(i) {
  const old = columns.value;
  console.log(JSON.stringify(old));
  let next;
  const freeLeft = old[0].colStart;
  const endRight = last(old).colStart + last(old).colSpan;
  const freeRight = stopsTotal - endRight;
  const borrowFromLeft = findLastIndex(old, col => col.colSpan > 1, i - 1);
  const borrowFromRight = findIndex(old, col => col.colSpan > 1, i);

  console.log({
    i,
    freeLeft,
    freeRight,
    borrowFromLeft,
    borrowFromRight
  });

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
      colSpan: from.colSpan - 1
    } : col) ];
    // Don't forget to subtract the stop we borrowed from left
    next.splice(i, 0, newColumn(old[i].colStart + old[i].colSpan - 1, 1));
  } else if (borrowFromRight !== -1) {
    // TODO borrowing just one stop is a bit miserly in some scenarios
    const from = old[borrowFromRight];
    // TODO a map that replaces one, then insert the new one
    next = [ ...old.map(col => (col._id === from._id) ? {
      ...from,
      colStart: from.colStart + 1,
      colSpan: from.colSpan - 1
    } : col) ];
    // We borrowed from the right so we don't need to subtract one
    next.splice(i, 0, newColumn(old[i].colStart, 1));
  } else {
    throw new Error('addBefore should not be reachable if no stops are free or borrowable');
  }
  columns.value = next;
  console.log('new columns:', JSON.stringify(next));
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

// If a request would cause columns to overlap, just deny it. The user
// can manually resize other columns to make room. TODO: would be nice
// to do some automatic reshuffling, or maybe it wouldn't

function columnChange(i, colStart, colSpan) {
  if (columns.value.some((column, index) => {
    if (index === i) {
      return false;
    }
    const a1 = colStart;
    const a2 = colStart + colSpan;
    const b1 = column.colStart;
    const b2 = column.colStart + column.colSpan;
    return intersects(a1, a2, b1, b2);
  })) {
    // So that x and width reset in the column
    console.log('Bumping generation due to intersection');
    generation.value++;
    return;
  }
  const updated = [...columns.value.filter((column, index) => index !== i), {
    ...columns[i],
    colStart,
    colSpan
  }];
  updated.sort((a, b) => {
    return a.colStart - b.colStart;
  });
  columns.value = updated;
  // In case the other parameters didn't change: we still want
  // to reset any partial moves
  generation.value++;
}

function intersects(a1, a2, b1, b2) {
  // This is lazy, but effective
  console.log(a1, a2, b1, b2);
  const places = [];
  for (let i = 0; (i < stopsTotal); i++) {
    places[i] = false;
  }
  for (let i = a1; (i < a2); i++) {
    places[i] = true;
  }
  for (let i = b1; (i < b2); i++) {
    if (places[i]) {
      return true;
    }
  }
  return false;
}

// Because fromIndex is missing from the standard methods for no reason
function findIndex(a, fn, fromIndex) {
  return a.findIndex((v, i) => (i >= fromIndex) && fn(v));
}

function findLastIndex(a, fn, fromIndex) {
  return a.findLastIndex((v, i) => (i <= fromIndex) && fn(v));
}
</script>

<style lang="scss" scoped>
  .contextual-heading-controls {
    display: none;
    width: 100%;
  }
  .focused {
    min-height: 50vh;
  }
  .focused .contextual-heading-controls {
    display: block;
  }
  .stops {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(var(--stops), 1fr);
    grid-template-rows: 4px;
  }
  .stop {
    box-sizing: border-box;
    border-left: 1px solid blue;
    border-right: 1px solid blue;
  }
  .columns {
    display: block;
    position: relative;
    width: 100%;
  }
  .column {
    position: absolute;
  }
</style>