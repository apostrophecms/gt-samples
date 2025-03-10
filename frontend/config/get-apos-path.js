const fs = require('fs');
const cp = require('child_process');

// NOTE: assumes just one apostrophecms theme (default) which is also the situation
// in a single-site project.
// 
// This approach would need review if multiple apostrophecms multisite themes were configured,
// but it is usually in your best interest to have only one with lots of flexibility designed in. -Tom

module.exports = type => {
  const isDev = (process.env.ENV === 'development') || !process.env.ENV;
  if (isDev) {
    return `/cms/apos-frontend/default/public-bundle.${type}`;
  } else {
    return `/cms/apos-frontend/releases/${getAposReleaseId()}/default/public-bundle.${type}`;
  }
};

// From Apostrophe core, for consistency
function getAposReleaseId() {
  const viaEnv = process.env.APOS_RELEASE_ID ||
    process.env.HEROKU_RELEASE_VERSION ||
    process.env.PLATFORM_TREE_ID;
  if (viaEnv) {
    return viaEnv;
  }
  try {
    return fs.readFileSync(`${self.apos.rootDir}/release-id`, 'utf8').trim();
  } catch (e) {
    // OK, consider fallbacks instead
  }
  const realPath = fs.realpathSync(self.apos.rootDir);
  // Stagecoach and similar: find a release timestamp in the path and use that
  const matches = realPath.match(/\/(\d\d\d\d-\d\d-\d\d[^/]+)/);
  if (matches) {
    return matches[1];
  }
  try {
    const fromGit = cp.execSync('git rev-parse --short HEAD', {
      encoding: 'utf8'
    }).trim();
    return fromGit;
  } catch (e) {
    throw new Error(stripIndent`
      When running in production you must set the APOS_RELEASE_ID
      environment variable to a short, unique string identifying this
      particular release of the application, or write it to the file
      release-id. Apostrophe will also autodetect HEROKU_RELEASE_VERSION,
      PLATFORM_TREE_ID or the current git commit if your deployment is a
      git checkout.
    `);
  }
}
