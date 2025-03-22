module.exports = {
  options: {
    alias: 'imageWidget',
    preview: true
  },
  fields: {
    add: {
      width: {
        label: 'Width',
        type: 'select',
        choices: [
          {
            value: 'image-widget-full',
            label: 'Full Width'
          },
          {
            value: 'image-widget-one-half',
            label: 'One Half'
          },
          {
            value: 'image-widget-percent',
            label: 'Custom Percentage'
          },
          {
            value: 'image-widget-pixels',
            label: 'Custom Pixels'
          },
        ],
        def: 'image-widget-full',
      },
      percent: {
        type: 'range',
        min: 0,
        max: 100,
        def: 100,
        if: {
          width: 'image-widget-percent'
        },
        help: 'Relative to the width of the container'
      },
      pixels: {
        type: 'integer',
        min: 1,
        max: 5000,
        required: true,
        if: {
          width: 'image-widget-pixels'
        },
        help: 'Will not exceed the width of the container'
      },
    }
  },
  helpers(self) {
    return {
      gtStyle(widget) {
        if (widget.width === 'image-widget-percent') {
          return `width: ${widget.percent}%`;
        } else if (widget.width === 'image-widget-pixels') {
          return `width: ${widget.pixels}px`;
        } else {
          return '';
        }
      }
    }
  }
}
