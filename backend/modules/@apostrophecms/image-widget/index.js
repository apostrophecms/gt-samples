module.exports = {
  fields: {
    add: {
      className: {
        label: 'Presentation Style',
        type: 'select',
        choices: [
          {
            value: 'image-widget-one-half',
            label: 'One Half (Centered)'
          },
          {
            value: 'image-widget-full',
            label: 'Full Width'
          }
        ],
        def: 'image-widget-full'
      }
    }
  }
}
