<template>
  <div ref="el" :class="{ focused }" :style="`--stops: ${stopsTotal}`">
    <div class="contextual-heading-controls">
      <div class="stops">
        <div v-for="i in stopsTotal" class="stop"></div>
      </div>
      <div class="columns">
        <GridLayoutEditorZone v-for="zone in zones"
          :zone="log('zone:', zone)"
          :stop-size="stopSize"
          :stops-total="stopsTotal"
          :generation="generation"
          @change="columnChange(zone.i, $event)"
          @add="add(zone.i)"
          @remove="remove(zone.i)"
          :key="zone._id"
        />
      </div>
    </div>
    <div class="grid-layout-columns">
      <div
        class="grid-layout-column"
        v-for="(column, i) in props.modelValue.columns"
        :key="column._id"
        :style="`--start: ${column.colStart + 1}; --end: ${column.colStart + column.colSpan + 1}`"
      >
        <!-- TODO ask Miro if I'm handling meta right -->
        <AposAreaEditor
          :id="column.content._id"
          :items="column.content.items"
          :meta="meta"
          :choices="choices"
          :options="areaField.options"
          :field-id="areaField._id"
          :field="areaField"
          @changed="edited(i, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO npm install at project level
import { createId } from '@paralleldrive/cuid2';

import { onRenderTriggered, watch, ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps([ 'modelValue', 'meta', 'options', 'focused' ]);
const emit = defineEmits([ 'update' ]);
const el = ref(null);
const generation = ref(0);
const stopSize = ref(null);
const stopsTotal = props.options.stops || apos.modules['grid-layout-widget'].stops;
const areaField = apos.modules['grid-layout-widget'].areaField;
const choices = getChoices();

onRenderTriggered(e => {
  if (Math.random() < 0.01) {
    debugger;
  }
});

watch(() => props.modelValue, 'modelValue changed');

if (!props.modelValue.columns) {
  update([ newColumn(0, stopsTotal) ]);
}

let resizeObserver;

onMounted(() => {
  stopSize.value = el.value.getBoundingClientRect().width / stopsTotal;
  // resizeObserver = new ResizeObserver(entries => {
  //   const entry = entries[0];
  //   stopSize.value = entry.contentRect.width / stopsTotal;
  // });
  // resizeObserver.observe(el.value);
});

onBeforeUnmount(() => {
  // if (resizeObserver) {
  //   resizeObserver.disconnect();
  // }
});

function edited(i, $event) {
  update(props.modelValue.columns.map((column, index) => {
    if (i === index) {
      return {
        ...props.modelValue.columns[i],
        content: {
          ...props.modelValue.columns[i].content,
          items: $event.items
        }
      };
    } else {
      return column;
    }
  }));
}

function update(columns) {
  emit('update', {
    ...props.modelValue,
    columns
  });
}

const zones = computed(() => {
  console.log('computing zones');
  const result = [];
  let lastStop = 0;
  const c = props.modelValue.columns || [];
  for (let i = 0; (i < c.length); i++) {
    const column = c[i];
    if (column.colStart > lastStop) {
      result.push({
        type: 'gap',
        i,
        colStart: lastStop,
        colSpan: column.colStart - lastStop,
        _id: `before-${column._id}`
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
      colSpan: stopsTotal - lastStop,
      _id: 'last'
    });
  }
  return result;
});

// i is a column index in the columns array, not a stop number.
// If (i === props.modelValue.columns.length) then the new column is added
// at the end, otherwise before column i
function add(i) {
  const old = props.modelValue.columns;
  let next;
  if (i === 0) {
    if (old[i].colStart === 0) {
      throw new Error('add(0) should not be possible if there is no gap to the left of the first column');
    }
    next = [ newColumn(0, old[i].colStart), ...old ];
  } else if (i > props.modelValue.columns.length) {
    throw new Error('add(i) with i > props.modelValue.columns.length should not be possible');
  } else if (i === props.modelValue.columns.length) {
    const endPrevious = old[i - 1].colStart + old[i - 1].colSpan;
    const available = stopsTotal - endPrevious;
    if (!available) {
      throw new Error('add(props.modelValue.columns.length) should not be possible when there is no gap at the end');
    }
    next = [ ...old, newColumn(endPrevious, available) ];
  } else {
    const endPrevious = old[i - 1].colStart + old[i - 1].colSpan;
    const available = old[i].colStart - endPrevious;
    if (!available) {
      throw new Error('add(i) should not be possible when column i is not preceded by a gap');
    }
    next = [ ...old.slice(0, i), newColumn(endPrevious, available), ...old.slice(i) ];
  }
  update(next);
}

function newColumn(col, span) {
  return {
    metaType: 'arrayItem',
    _id: createId(),
    colStart: col,
    colSpan: span,
    content: {
      metaType: 'area',
      _id: createId(),
      items: []
    }
  };
}

function remove(i) {
  update(props.modelValue.columns.filter((column, index) => index !== i));
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
  if (props.modelValue.columns.some((column, index) => {
    if (index === i) {
      return false;
    }
    const a1 = colStart;
    const a2 = colStart + colSpan;
    const b1 = column.colStart;
    const b2 = column.colStart + column.colSpan;
    if (intersects(a1, a2, b1, b2)) {
      return true;
    }
  })) {
    // Force redraw without changes to the props
    generation.value++;
    return;
  }
  const updated = [...props.modelValue.columns.filter((column, index) => index !== i), {
    ...props.modelValue.columns[i],
    colStart,
    colSpan
  }];
  updated.sort((a, b) => {
    return a.colStart - b.colStart;
  });
  update(updated);
}

function intersects(a1, a2, b1, b2) {
  // This is lazy, but effective
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

// TODO should be shard with core
function getChoices() {
  const result = [];

  let widgets = areaField.options.widgets || {};
  if (areaField.options.groups) {
    for (const group of Object.entries(areaField.options.groups)) {
      widgets = {
        ...widgets,
        ...group.widgets
      };
    }
  }

  for (const [ name, options ] of Object.entries(widgets)) {
    result.push({
      name,
      label: options.addLabel || apos.modules[`${name}-widget`]?.label,
      icon: apos.modules[`${name}-widget`]?.icon
    });
  }
  return result;
}

function log(msg, a) {
  console.log(msg, JSON.stringify(a, null, '  '));
  return a;
}
</script>

<style lang="scss" scoped>
  .contextual-heading-controls {
    display: none;
    width: 100%;
    padding-top: 1em;
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
