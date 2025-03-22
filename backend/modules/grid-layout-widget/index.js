const { readFileSync } = require('fs');
const { join } = require('path');

const widgets = require('../../lib/content-area-widgets.js');
const getLayoutAreas = require('./lib/get-layout-areas.js');
const getLayoutConfig = require('./lib/get-layout-config.js');
const getLayoutClasses = require('./lib/get-layout-classes.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Grid Layout',
    width: 'one-half',
    icon: 'view-grid',
    description: 'Create responsive CSS Grid-based layouts for your content.',
    previewImage: 'svg',
    alias: 'gridLayoutWidget',
    box: false
  },
  icons: {
    'view-grid': 'ViewGrid'
  },
  // We need to pass fields as a function to allow for the preview HTML
  fields(self, options) {
    // Reusable config for the various content areas
    const baseAreaConfig = {
      widgets
    };
    // Read the preview HTML, easier to maintain in a separate file
    const previewHtml = readFileSync(
      join(__dirname, 'layoutPreviews.html'),
      'utf8'
    );
    return {
      add: {
        layoutType: {
          type: 'select',
          label: 'Layout Type',
          htmlHelp: previewHtml,
          required: true,
          def: 'fullWidthMain',
          choices: [
            {
              label: 'Full Width',
              value: 'fullWidthMain'
            },
            {
              label: 'Aside + Main Content',
              value: 'asideMain'
            },
            {
              label: 'Main Content + Aside',
              value: 'mainAside'
            },
            {
              label: 'Aside + Two Main Sections',
              value: 'asideTwoMain'
            },
            {
              label: 'Two Main Sections + Aside',
              value: 'twoMainAside'
            },
            {
              label: 'Header + 2 Columns + Footer',
              value: 'headerTwoColFooter'
            },
            {
              label: 'Featured + 3 Column Grid',
              value: 'featuredThreeGrid'
            },
            {
              label: 'Magazine Layout',
              value: 'magazineLayout'
            },
            {
              label: 'Content Hub',
              value: 'contentHub'
            },
            {
              label: 'Gallery Masonry',
              value: 'galleryMasonry'
            },
            {
              label: 'Dashboard Layout',
              value: 'dashboardLayout'
            },
            {
              label: 'Product Showcase',
              value: 'productShowcase'
            }
          ]
        },
        maxWidth: {
          type: 'select',
          label: 'Maximum Content Width',
          choices: [
            { label: 'Full Width', value: '' },
            { label: 'Extra Narrow (768px)', value: 'max-width-768' },
            { label: 'Narrow (960px)', value: 'max-width-960' },
            { label: 'Medium (1152px)', value: 'max-width-1152' },
            { label: 'Wide (1344px)', value: 'max-width-1344' }
          ],
          def: ''
        },
        areaStyles: {
          type: 'object',
          label: 'Area Styling',
          fields: {
            add: {
              verticalAlign: {
                type: 'select',
                label: 'Vertical Alignment',
                choices: [
                  { label: 'Top', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'Bottom', value: 'end' },
                  { label: 'Stretch', value: 'stretch' }
                ],
                def: 'start'
              },
              horizontalAlign: {
                type: 'select',
                label: 'Horizontal Alignment',
                choices: [
                  { label: 'Left', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'end' },
                  { label: 'Stretch', value: 'stretch' }
                ],
                def: 'stretch'
              }
            }
          }
        },
        mainContent: {
          type: 'area',
          label: 'Main Content Area',
          options: baseAreaConfig,
        },
        primaryAsideContent: {
          type: 'area',
          label: 'Primary Aside',
          options: baseAreaConfig,
        },
        secondaryAsideContent: {
          type: 'area',
          label: 'Secondary Aside or Main',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'twoMainAside' },
              { layoutType: 'asideTwoMain' },
              { layoutType: 'magazineLayout' },
              { layoutType: 'featuredThreeGrid' },
              { layoutType: 'galleryMasonry' },
              { layoutType: 'dashboardLayout' }
            ]
          }
        },
        // Layout-specific content areas
        headerContent: {
          type: 'area',
          label: 'Header Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        footerContent: {
          type: 'area',
          label: 'Footer Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        columnThreeContent: {
          type: 'area',
          label: 'Column Three',
          options: baseAreaConfig,
          if: {
            layoutType: 'featuredThreeGrid'
          }
        },
        headlineContent: {
          type: 'area',
          label: 'Headline Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section1Content: {
          type: 'area',
          label: 'Footer Section 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section2Content: {
          type: 'area',
          label: 'Footer Section 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        galleryBottomContent: {
          type: 'area',
          label: 'Bottom Footer Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        tertiaryAsideContent: {
          type: 'area',
          label: 'Tertiary Aside Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        related1Content: {
          type: 'area',
          label: 'Related Product 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        related2Content: {
          type: 'area',
          label: 'Related Product 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        related3Content: {
          type: 'area',
          label: 'Related Product 3',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        }
      }
    };
  },
  helpers(self) {
    return {
      getLayoutAreas(widget) {
        return getLayoutAreas(widget);
      },
      getLayoutConfig(widget) {
        return getLayoutConfig(widget);
      },
      getLayoutClasses(widget) {
        return getLayoutClasses(widget);
      }
    }
  }
};
