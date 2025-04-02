// Reused by various areas so we can maintain the list in one place.
// These are content widgets, not the high level grid layout widget,
// which is currently offered at the page level in the home-page
// and default-page modules to encourage users to think about layout
// first, then about typing in content

module.exports = {
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
      '|',
      'table'
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
      'importTable'
    ]
  },
  'rich-text-with-figure': {},
  '@apostrophecms/image': {},
  '@apostrophecms/video': {},
  'snippet': {},
  '@apostrophecms/form': {}
};
