// Don't allow snippets in snippets
const { snippet, ...widgets } = require('../../lib/content-area-widgets.js');

module.exports = {
  extend: '@apostrophecms/piece-type',
	options: {
		label: 'Snippet',
		pluralLabel: 'Snippets'
	},
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