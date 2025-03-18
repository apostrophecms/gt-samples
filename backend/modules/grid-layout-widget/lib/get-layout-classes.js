// Build classes for the layout

module.exports = widget => [
  'custom-layout-widget',
  `custom-layout-widget-${widget._id}`,
  `layout-type-${widget.layoutType}`,
  widget.maxWidth
].filter(Boolean).join(' ');

