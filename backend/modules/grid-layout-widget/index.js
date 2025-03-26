const { readFileSync } = require('fs');
const { join } = require('path');

const widgets = require('../../lib/content-area-widgets.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Grid Layout',
    // contextual: true,
    icon: 'view-grid',
    description: 'Create responsive CSS Grid-based layouts for your content.',
    previewImage: 'svg',
    alias: 'gridLayoutWidget',
    box: false,
    contextual: true,
    components: {
      widgetEditor: 'GridLayoutEditor'
    },
    stops: 12
  },
  icons: {
    'view-grid': 'ViewGrid'
  },
  // We need to pass fields as a function to allow for the preview HTML
  fields(self, options) {
    // Reusable config for the various content areas
    const baseAreaConfig = {
      widgets
    };
    return {
      add: {
        columns: {
          type: 'array',
          label: 'Columns',
          fields: {
            add: {
              content: {
                type: 'area',
                options: {
                  widgets
                }
              },
              colStart: {
                type: 'integer',
                min: 1,
                max: 12,
                required: true
              },
              colSpan: {
                type: 'integer',
                min: 1,
                max: 12,
                required: true
              }
            }
          }
        }
      }
    };
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const data = _super(req);
        return {
          ...data,
          stops: self.options.stops
        };
      }
    }
  }
};
