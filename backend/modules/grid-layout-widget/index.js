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
    alias: 'gridLayoutWidget'
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
          choices: [
            {
              label: 'Aside + Main Content',
              value: 'asideMainThree'
            },
            {
              label: 'Main Content + Aside',
              value: 'mainAsideThree'
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
          if: {
            $or: [
              { layoutType: 'asideMainThree' },
              { layoutType: 'mainAsideThree' },
              { layoutType: 'asideTwoMain' },
              { layoutType: 'twoMainAside' },
              { layoutType: 'headerTwoColFooter' },
              { layoutType: 'featuredThreeGrid' },
              { layoutType: 'magazineLayout' },
              { layoutType: 'contentHub' },
              { layoutType: 'galleryMasonry' },
              { layoutType: 'dashboardLayout' },
              { layoutType: 'productShowcase' }
            ]
          },
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
        asideContent: {
          type: 'area',
          label: 'Aside Content',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'asideMainThree' },
              { layoutType: 'mainAsideThree' }
            ]
          }
        },
        mainContent: {
          type: 'area',
          label: 'Main Content',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'asideMainThree' },
              { layoutType: 'mainAsideThree' }
            ]
          }
        },
        headerContent: {
          type: 'area',
          label: 'Header Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        leftColumnContent: {
          type: 'area',
          label: 'Left Column',
          options: baseAreaConfig,
          if: {
            layoutType: 'headerTwoColFooter'
          }
        },
        rightColumnContent: {
          type: 'area',
          label: 'Right Column',
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
        featuredContent: {
          type: 'area',
          label: 'Featured Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'featuredThreeGrid'
          }
        },
        columnOneContent: {
          type: 'area',
          label: 'Column One',
          options: baseAreaConfig,
          if: {
            layoutType: 'featuredThreeGrid'
          }
        },
        columnTwoContent: {
          type: 'area',
          label: 'Column Two',
          options: baseAreaConfig,
          if: {
            layoutType: 'featuredThreeGrid'
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
        asideLongContent: {
          type: 'area',
          label: 'Aside Content (Full Height)',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'twoMainAside' },
              { layoutType: 'asideTwoMain' }
            ]
          }
        },
        mainTopContent: {
          type: 'area',
          label: 'Main Content - Top Section',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'twoMainAside' },
              { layoutType: 'asideTwoMain' }
            ]
          }
        },
        mainBottomContent: {
          type: 'area',
          label: 'Main Content - Bottom Section',
          options: baseAreaConfig,
          if: {
            $or: [
              { layoutType: 'twoMainAside' },
              { layoutType: 'asideTwoMain' }
            ]
          }
        },
        headlineContent: {
          type: 'area',
          label: 'Headline Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'magazineLayout'
          }
        },
        sidebarContent: {
          type: 'area',
          label: 'Sidebar Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'magazineLayout'
          }
        },
        feature1Content: {
          type: 'area',
          label: 'Feature 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'magazineLayout'
          }
        },
        feature2Content: {
          type: 'area',
          label: 'Feature 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'magazineLayout'
          }
        },
        feature3Content: {
          type: 'area',
          label: 'Feature 3',
          options: baseAreaConfig,
          if: {
            layoutType: 'magazineLayout'
          }
        },
        heroContent: {
          type: 'area',
          label: 'Hero Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        featuredHubContent: {
          type: 'area',
          label: 'Featured Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        quickLinksContent: {
          type: 'area',
          label: 'Quick Links',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section1Content: {
          type: 'area',
          label: 'Section 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        section2Content: {
          type: 'area',
          label: 'Section 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        fullWidthContent: {
          type: 'area',
          label: 'Full Width Content',
          options: baseAreaConfig,
          if: {
            layoutType: 'contentHub'
          }
        },
        galleryFeaturedContent: {
          type: 'area',
          label: 'Featured Gallery Item',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        gallerySide1Content: {
          type: 'area',
          label: 'Side Gallery Item 1',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        gallerySide2Content: {
          type: 'area',
          label: 'Side Gallery Item 2',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        galleryBottomContent: {
          type: 'area',
          label: 'Bottom Gallery Item',
          options: baseAreaConfig,
          if: {
            layoutType: 'galleryMasonry'
          }
        },
        mainMetricContent: {
          type: 'area',
          label: 'Main Metric',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        sideMetricsContent: {
          type: 'area',
          label: 'Side Metrics',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        chartContent: {
          type: 'area',
          label: 'Chart',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        tableContent: {
          type: 'area',
          label: 'Table',
          options: baseAreaConfig,
          if: {
            layoutType: 'dashboardLayout'
          }
        },
        mainProductContent: {
          type: 'area',
          label: 'Main Product',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
          }
        },
        productDetailsContent: {
          type: 'area',
          label: 'Product Details',
          options: baseAreaConfig,
          if: {
            layoutType: 'productShowcase'
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
