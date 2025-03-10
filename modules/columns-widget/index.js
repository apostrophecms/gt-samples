const widgets = {
  '@apostrophecms/rich-text': {
    toolbar: [
      'styles',
      '|',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'bulletList',
      'orderedList',
      'table',
      'image'
    ],
    styles: [
      {
        tag: 'p',
        label: 'Paragraph (P)'
      },
      {
        tag: 'h3',
        label: 'Heading 3 (H3)'
      },
      {
        tag: 'h4',
        label: 'Heading 4 (H4)'
      }
    ],
    insert: [
      'table',
      'image'
    ]
  },
  '@apostrophecms/image': {
    // Don't let them pick an image that will pixelate
    minSize: [ 1024, 1024 ]
  },
  '@apostrophecms/video': {},
  'snippet': {}
};

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Columns',
    icon: 'pillar',
    description: 'Create flexible layouts for your content.',
    previewImage: 'svg'
  },
  fields: {
    add: {
      cols: {
        type: 'select',
        label: 'Column Configuration',
        choices: [
          {
            label: 'Single column, 50%',
            value: 'single-50',
            def: true
          },
          {
            label: '50% / 50%',
            value: '50-50'
          },
          {
            label: '33% / 33% / 33%',
            value: '33-33-33'
          }
        ]
      },
      one: {
        type: 'area',
        contextual: true,
        options: {
          widgets
        }
      },
      two: {
        type: 'area',
        contextual: true,
        options: {
          widgets
        },
        if: {
          $or: [
            { cols: '33-33-33' },
            { cols: '50-50' },
            { cols: '40-40' }
          ]
        }
      },
      three: {
        type: 'area',
        contextual: true,
        if: {
          cols: '33-33-33'
        },
        options: {
          widgets
        }
      }
    }
  },
  icons: {
    pillar: 'Pillar'
  }
};
