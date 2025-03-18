
// Constants for grid defaults
const GRID_DEFAULTS = {
  COLUMNS: 12,
  GAP: '1rem',
  PADDING: '1rem',
  MARGIN: 'auto',
  MOBILE_GAP: '0.5rem',
  MOBILE_PADDING: '0.5rem'
};

// Basic preset configurations for different layout types
const presetConfigs = {
  asideMainThree: { rows: 3 },
  mainAsideThree: { rows: 3 },
  asideTwoMain: { rows: 4 },
  twoMainAside: { rows: 4 },
  headerTwoColFooter: { rows: 3 },
  featuredThreeGrid: { rows: 2 },
  magazineLayout: { rows: 3, gap: '1.5rem' },
  contentHub: { rows: 5, gap: '2rem' },
  galleryMasonry: { rows: 3 },
  dashboardLayout: { rows: 2, gap: '1.5rem' },
  productShowcase: { rows: 3, gap: '2rem' }
};

// Helper function to get layout configuration
module.exports = widget => {
  // Our base configuration that applies to all layouts
  const defaultConfig = {
    columns: GRID_DEFAULTS.COLUMNS,
    gap: GRID_DEFAULTS.GAP,
    padding: GRID_DEFAULTS.PADDING,
    margin: GRID_DEFAULTS.MARGIN,
    mobileGap: GRID_DEFAULTS.MOBILE_GAP,
    mobilePadding: GRID_DEFAULTS.MOBILE_PADDING
  };

  // If we don't have a layout type, return default config
  if (!widget?.layoutType) {
    console.error('Layout type is required for custom layout widget');
    return defaultConfig;
  }

  // For preset layouts, merge with preset config
  return {
    ...defaultConfig,
    ...(presetConfigs[widget.layoutType] || { rows: 1 })
  };
};