module.exports = {
  options: {
    preview: true
  },
  fields: {
    add: {
      boxWidth: {
        label: 'Width',
        type: 'select',
        choices: [
          {
            value: 'widget-full',
            label: 'Full Width'
          },
          {
            value: 'widget-one-half',
            label: 'One Half'
          },
          {
            value: 'widget-percent',
            label: 'Custom Percentage'
          },
          {
            value: 'widget-pixels',
            label: 'Custom Pixels'
          },
        ],
        def: 'widget-full',
      },
      boxPercent: {
        type: 'range',
        min: 0,
        max: 100,
        def: 100,
        if: {
          boxWidth: 'widget-percent'
        },
        help: 'Relative to the width of the container'
      },
      boxPixels: {
        type: 'integer',
        min: 1,
        max: 5000,
        required: true,
        if: {
          boxWidth: 'widget-pixels'
        },
        help: 'Will not exceed the width of the container'
      },
    }
  },
  extendMethods(self) {
    return {
      async output(_super, req, widget, options, _with) {
        const content = await _super(req, widget, options, _with);
        return self.render(req, 'box', {
          widget,
          content,
          attrs: {
            style: self.widgetBoxStyle(widget),
            class: self.widgetBoxClass(widget)
          }
        });
      }
    }
  },
  methods(self) {
    return {
      widgetBoxStyle(widget) {
        if (widget.boxWidth === 'widget-percent') {
          return `width: ${widget.boxPercent}%`;
        } else if (widget.boxWidth === 'widget-pixels') {
          return `width: ${widget.boxPixels}px`;
        } else {
          return '';
        }
      },
      widgetBoxClass(widget) {
        return `widget-box ${widget.boxWidth}`;
      }
    };
  }
};
