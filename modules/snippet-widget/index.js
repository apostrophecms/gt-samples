// in sites/snippet-widget/index.js

module.exports = {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      _snippets: {
        type: 'relationship',
        withType: 'snippet',
        required: true,
        max: 1
      }
    }
  }
};