module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      content: {
      	type: 'area',
      	label: 'Content',
      	options: {
      	  widgets: {
      	    '@apostrophecms/rich-text': {
      	      // For example: allow h3, h4, paragraphs, some styling,
      	      // and inline images and tables
      	      toolbar: [ 'styles', 'bold', 'italic', 'link', 'image', 'table' ],
      	      styles: [
      	        {
      	          tag: 'h3',
      	          label: 'Heading 3'
      	        },
      	        // EXAMPLE: only makes sense if you add CSS for the class "fancy"
      	        // to your project. You can have multiple variations of any
      	        // heading with different classes on the menu
      	        {
      	          tag: 'h3',
      	          class: 'fancy',
      	          label: 'Fancy Heading 3'
      	        },
      	        {
      	          tag: 'h4',
      	          label: 'Heading 4'
      	        },
      	        {
      	          tag: 'p',
      	          label: 'Paragraph'
      	        }
      	      ],
      	      // For example: allow inserting new images and tables with the "/" key
      	      insert: [ 'image', 'table' ]
      	    },
      	    '@apostrophecms/image': {
      	      // Always a good idea to set a minimum size to prevent pixelation
      	      minSize: [ 1024, 1024 ],
      	      // ONLY if you want to force a specific aspect ratio & autocrop when needed,
              // please consider actual design preferences before using this example or
              // skip this
      	      aspectRatio: [ 4, 3 ]
      	    },
      	    '@apostrophecms/video': {},
      	    // Activate your own widget types here
      	  }
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