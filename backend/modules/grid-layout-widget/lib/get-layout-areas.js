module.exports = (widget) => {
  switch (widget.layoutType) {
    case 'fullWidthMain':
      return [
        {
          name: 'main',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];
    case 'asideMain':
      return [
        {
          name: 'aside',
          areaName: 'primaryAsideContent',
          colStart: 1,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 5,
          mobileColSpan: 12,
        },
        {
          name: 'main',
          areaName: 'mainContent',
          colStart: 5,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 7,
          mobileColSpan: 12,
        },
      ];

    case 'mainAside':
      return [
        {
          name: 'main',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 7,
          mobileColSpan: 12,
        },
        {
          name: 'aside',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 5,
          mobileColSpan: 12,
        },
      ];

    case 'asideTwoMain':
      return [
        {
          name: 'aside',
          areaName: 'primaryAsideContent',
          colStart: 1,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 4,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'main-top',
          areaName: 'mainContent',
          colStart: 5,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'main-bottom',
          areaName: 'secondaryAsideContent',
          colStart: 5,
          colSpan: 8,
          rowStart: 3,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
      ];

    case 'twoMainAside':
      return [
        {
          name: 'main-top',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'main-bottom',
          areaName: 'secondaryAsideContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 3,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'aside',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 4,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];

    case 'headerTwoColFooter':
      return [
        {
          name: 'header',
          areaName: 'headerContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'left',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'right',
          areaName: 'primaryAsideContent',
          colStart: 7,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'footer',
          areaName: 'footerContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'featuredThreeGrid':
      return [
        {
          name: 'featured',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'col1',
          areaName: 'primaryAsideContent',
          colStart: 1,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'col2',
          areaName: 'secondaryAsideContent',
          colStart: 5,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'col3',
          areaName: 'columnThreeContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];

    case 'magazineLayout':
      return [
        {
          name: 'feature',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'topSidebar',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'bottomSidebar',
          areaName: 'secondaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        }
      ];

    case 'contentHub':
      return [
        {
          name: 'headline',
          areaName: 'headlineContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'featured',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 2,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'quickLinks',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 2,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'section1',
          areaName: 'section1Content',
          colStart: 1,
          colSpan: 6,
          rowStart: 4,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'section2',
          areaName: 'section2Content',
          colStart: 7,
          colSpan: 6,
          rowStart: 4,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        }
      ];

    case 'galleryMasonry':
      return [
        {
          name: 'featured',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'side1',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'side2',
          areaName: 'secondaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'bottom',
          areaName: 'galleryBottomContent',
          colStart: 1,
          colSpan: 12,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'dashboardLayout':
      return [
        {
          name: 'mainMetric',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'sideMetrics',
          areaName: 'primaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'chart',
          areaName: 'secondaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'table',
          areaName: 'tertiaryAsideContent',
          colStart: 9,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];

    case 'productShowcase':
      return [
        {
          name: 'mainProduct',
          areaName: 'mainContent',
          colStart: 1,
          colSpan: 6,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'details',
          areaName: 'primaryAsideContent',
          colStart: 7,
          colSpan: 6,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'related1',
          areaName: 'related1Content',
          colStart: 1,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'related2',
          areaName: 'related2Content',
          colStart: 5,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'related3',
          areaName: 'related3Content',
          colStart: 9,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];
  }
};