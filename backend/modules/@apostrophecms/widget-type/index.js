module.exports = {
  options: {
    preview: true,
    box: true
  },
  fields(self, options) {
    if (!options.box) {
      return {};
    }
    return {
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
      },
      group: {
        box: {
          label: 'Box',
          fields: [ 'boxWidth', 'boxPercent', 'boxPixels' ]
        }
      }
    };
  },
  extendMethods(self) {
    return {
      composeSchema(_super) {
        if (self.options.box) {
          // Since we are forcing a box group to exist, politely move ungrouped fields to a "Main" group
          const ungrouped = Object.keys(self.fields).filter(name => !Object.values(self.fieldsGroups).some(group => group.fields.includes(name)));
          if (ungrouped.length) {
            const { main, ...rest } = self.fieldsGroups;
            if (main) {
              main.fields = [...main.fields, ...ungrouped];
            } else {
              self.fieldsGroups = {
                ...rest,
                // Goes after all intended groups except box
                main: {
                  label: 'Main',
                  fields: ungrouped
                }
              };
            }
          }
          // Make sure the box group goes at the end
          const {
            box,
            ...rest
          } = self.fieldsGroups;
          self.fieldsGroups = {
            ...rest,
            box
          };
        }
        return _super();
      },
      async output(_super, req, widget, options, _with) {
        const content = await _super(req, widget, options, _with);
        if (!self.options.box) {
          return content;
        }
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
