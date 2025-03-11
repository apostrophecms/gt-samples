module.exports = {
  routes(self) {
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
        try {
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
            await self.retrieve(req, url, contentType);
          } else {
            throw self.apos.error('notfound');
          }
        } catch (e) {
          console.error('error:', e);
          return req.res.status(e.status || 500).send('error');
        }
      },
      async retrieve(req, url, contentType) {
        const result = await fetch(new URL(url, req.baseUrl));
        if (result.status >= 400) {
          throw self.apos.error('notfound');
        }
        req.res.set('content-type', contentType);
        return req.res.send(await result.text());
      }
    }
  }
};
