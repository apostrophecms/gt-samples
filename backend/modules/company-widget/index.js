const contentAreaWidgets = Object.fromEntries(
  Object.entries(require('../../lib/content-area-widgets.js')).filter(([ name, value ]) => name !== 'company')
);

module.exports = {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      name: {
        type: 'string',
        required: true
      },
      locations: {
        type: 'array',
        inline: true,
        fields: {
          add: {
            street: {
              type: 'string',
              required: true
            },
            city: {
              type: 'string',
              required: true
            },
            state: {
              type: 'string',
              required: true
            },
            zip: {
              type: 'string',
              required: true
            }
          }
        }
      },
      products: {
        type: 'array',
        fields: {
          add: {
            name: {
              type: 'string',
              required: true
            },
            price: {
              type: 'float'
            },
            body: {
              type: 'area',
              options: {
                widgets: contentAreaWidgets
              }
            }
          }
        }
      }
    }
  }
};
