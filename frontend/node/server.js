const express = require('express');
const fs = require('fs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
const cmsProxies = {};

app.set('trust proxy', 1);

// Pages
proxy('/cms', true);

// Media
proxy('/uploads', false);

// ApostropheCMS APIs

proxy('/api/v1', false);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent');
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../build')));
   
app.get('/asset/public-bundle-css', async (req, res) => {
  return deliver(req, `${findCms(req)}/api/v1/asset/public-bundle-css`, 'text/css');
});

app.get('/asset/public-bundle-js', async (req, res) => {
  return deliver(req, `${findCms(req)}/api/v1/asset/public-bundle-js`, 'text/javascript');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// You can change for multisite (your lookup table based on `domain.js` would go here)
function findCms(req) {
  return 'http://localhost:3001';
}

function proxy(path, removePath) {
  app.use(
    path,
    (req, res, next) => {
      const baseUrl = findCms(req);
      if (!baseUrl) {
        res.status(404).send('CMS Address not found');
        return;
      }
      const key = `${baseUrl}:${path}`;
      // Don't re-create the proxy for every request
      cmsProxies[key] ||= createProxyMiddleware({
        target: baseUrl,
        changeOrigin: true,
        secure: false,
        pathRewrite: removePath ? { [`^${path}`]: '' } : {}
      });
      return cmsProxies[key](req, res, next);
    }
  );
}

async function deliver(req, url, contentType) {
  const res = req.res;
  try {
    const content = await retrieve(url);
    res.set('content-type', contentType);
    res.status(200);
    return res.send(content);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500);
    return res.send('error');
  }
}

async function retrieve(url) {
  const result = await fetch(url);
  if (result.status >= 400) {
    throw result;
  }
  return result.text();
}
