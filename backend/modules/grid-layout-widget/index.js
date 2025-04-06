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
    // Default # of stops
    stops: 12
  },
  icons: {
    'drag': 'Drag',
    'plus-circle-outline': 'PlusCircleOutline',
    'trash-can-outline': 'TrashCanOutline'
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
                min: 0,
                max: 100,
                required: true
              },
              colSpan: {
                type: 'integer',
                min: 1,
                max: 100,
                required: true
              }
            }
          }
        }
      }
    };
  },
  // TODO extend sanitize to reject colStart and colSpan if they exceed the actual caps at
  // area options level, or at module level
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const data = _super(req);
        const columnsField = findField(self.schema, 'columns');
        console.log(self.schema);
        const areaField = findField(columnsField.schema, 'content');
        return {
          ...data,
          stops: self.options.stops,
          areaField
        };
      }
    }
  }
};

function findField(schema, name) {
  return schema.find(field => field.name === name);
}
