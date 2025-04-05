<template>
  <div ref="el" :class="{ focused }" :style="`--stops: ${stopsTotal}`">
    <div class="contextual-heading-controls">
      <div class="stops">
        <div v-for="i in stopsTotal" class="stop"></div>
      </div>
      <div class="columns">
        <GridLayoutEditorZone v-for="zone in zones"
          :zone="zone"
          :stop-size="stopSize"
          :stops-total="stopsTotal"
          :generation="generation"
          @change="columnChange(zone.i, $event)"
          @add="add(zone.i)"
          @remove="remove(zone.i)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO npm install at project level
import { createId } from '@paralleldrive/cuid2';

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

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

const zones = computed(() => {
  const result = [];
  let lastStop = 0;
  const c = columns.value;
  for (let i = 0; (i < c.length); i++) {
    const column = c[i];
    if (column.colStart > lastStop) {
      result.push({
        type: 'gap',
        i,
        colStart: lastStop,
        colSpan: column.colStart - lastStop
      });
    }
    result.push({
      type: 'column',
      // needed for events bubbling back up
      i,
      ...column,
      allowRemove: c.length > 1
    });
    lastStop = column.colStart + column.colSpan;
  }
  if (lastStop < stopsTotal) {
    result.push({
      type: 'gap',
      // needed for events bubbling back up
      i: c.length,
      colStart: lastStop,
      colSpan: stopsTotal - lastStop
    });
  }
  return result;
});

// i is a column index in the columns array, not a stop number.
// If (i === columns.value.length) then the new column is added
// at the end, otherwise before column i
function add(i) {
  console.log(`--> ${i} ${columns.value.length}`);
  const old = columns.value;
  let next;
  if (i === 0) {
    if (old[i].colStart === 0) {
      throw new Error('add(0) should not be possible if there is no gap to the left of the first column');
    }
    next = [ newColumn(0, old[i].colStart), ...old ];
  } else if (i > columns.value.length) {
    throw new Error('add(i) with i > columns.value.length should not be possible');
  } else if (i === columns.value.length) {
    const endPrevious = old[i - 1].colStart + old[i - 1].colSpan;
    const available = stopsTotal - endPrevious;
    if (!available) {
      throw new Error('add(columns.value.length) should not be possible when there is no gap at the end');
    }
    next = [ ...old, newColumn(endPrevious, available) ];
  } else {
    console.log(`i is: ${i}`);
    const endPrevious = old[i - 1].colStart + old[i - 1].colSpan;
    const available = old[i].colStart - endPrevious;
    console.log(old[i - 1], old[i], endPrevious, available);
    if (!available) {
      throw new Error('add(i) should not be possible when column i is not preceded by a gap');
    }
    next = [ ...old.slice(0, i), newColumn(endPrevious, available), ...old.slice(i) ];
  }
  columns.value = next;
  console.log('new columns:', JSON.stringify(next));
}

function newColumn(col, span) {
  return {
    _id: createId(),
    colStart: col,
    colSpan: span
  };
}

function remove(i) {
  columns.value = columns.value.filter((column, index) => index !== i);
}

// If a request would cause columns to overlap, just deny it. The user
// can manually resize other columns to make room. TODO: would be nice
// to do some automatic reshuffling, or maybe it wouldn't

function columnChange(i, { colStart, colSpan }) {
  if (colStart < 0 || ((colStart + colSpan) > stopsTotal)) {
    // Force redraw without changes to the props
    generation.value++;
    return;
  }
  if (columns.value.some((column, index) => {
    if (index === i) {
      return false;
    }
    const a1 = colStart;
    const a2 = colStart + colSpan;
    const b1 = column.colStart;
    const b2 = column.colStart + column.colSpan;
    if (intersects(a1, a2, b1, b2)) {
      console.log(`${i} ${index} ${a1} ${a2} ${b1} ${b2}`);
      console.log(`c ${columns.value[i]._id} ${columns.value[index]._id}`);
      return true;
    }
  })) {
    // Force redraw without changes to the props
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
  // Force redraw in case there were no other changes to the props
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
</script>

<style lang="scss" scoped>
  .contextual-heading-controls {
    display: none;
    width: 100%;
    padding-top: 1em;
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