const widgets = require('../../lib/content-area-widgets.js');
const {
  '@apostrophecms/rich-text': richText,
  'rich-text-with-figure': ignore,
  ...other
} = widgets;

module.exports = {
  options: {
    label: 'Rich Text with Figure'
  },
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      figure: {
        type: 'area',
        label: 'Figure',
        options: {
          widgets: other,
          max: 1
        }
      },
      richText: {
        type: 'area',
        label: 'Text',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richText
          },
          max: 1
        }
      },
      float: {
        type: 'select',
        choices: [
          {
            value: 'text-float-left',
            label: 'Float Left'
          },
          {
            value: 'text-float-right',
            label: 'Float Right'
          }
        ],
        required: true,
        def: 'text-float-left'
      },
      size: {
        type: 'select',
        choices: [
          {
            value: 'text-float-one-quarter',
            label: 'One-Quarter'
          },
          {
            value: 'text-float-one-third',
            label: 'One-Third',
          },
          {
            value: 'text-float-one-half',
            label: 'One-Half'
          },
          {
            value: 'text-float-two-thirds',
            label: 'Two Thirds'
          }
        ],
        required: true,
        def: 'text-float-one-third'
      }
    }
  }
};
