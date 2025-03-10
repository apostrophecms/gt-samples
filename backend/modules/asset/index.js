module.exports = {
  apiRoutes(self) {
    return {
      get: {
        // /api/v1/asset/public-bundle-css returns the styles
        publicBundleCss(req) {
          return self.fetchBundle(req, 'css', 'public-bundle', 'text/css');
        },
        // /api/v1/asset/public-bundle-js returns the javascript
        publicBundleJs(req) {
          return self.fetchBundle(req, 'js', 'public-module-bundle', 'text/javascript');
        }
      }
    };
  },
  methods(self) {
    return {
      async fetchBundle(req, extension, bundleName, contentType) {
        let content = 'scripts\nstylesheets';
        content = self.apos.template.insertBundlesMarkup({
          scene: 'public',
          content,
          scriptsPlaceholder: 'scripts',
          stylesheetsPlaceholder: 'stylesheets',
          widgetsBundles: {}
        });
        const [ , url ] = content.match(new RegExp(`"(.*?${bundleName}.${extension})"`));
        if (url) {
          req.res.set('content-type', contentType);
          return self.retrieve(req, url, 'text/html');
        } else {
          throw self.apos.error('notfound');
        }
      },
      async retrieve(req, url) {
        const result = await fetch(new URL(url, req.baseUrl));
        if (result.status >= 400) {
          throw self.apos.error('notfound');
        }
        return result.text();
      }
    }
  }
};
