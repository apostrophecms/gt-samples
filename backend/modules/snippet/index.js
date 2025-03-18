const widgets = require('../../lib/content-area-widgets.js');

module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      content: {
      	type: 'area',
      	label: 'Content',
      	options: {
      	  widgets
      	}
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'content'
        ]
      }
    }
  }
};       