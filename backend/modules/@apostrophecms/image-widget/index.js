module.exports = {
  fields: {
    add: {
      className: {
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
        def: 'full'
      }
    }
  }
}
