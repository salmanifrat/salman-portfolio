const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const BASE_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let relPath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  if (!relPath) relPath = 'index.html';

  const fullPath = path.resolve(BASE_DIR, relPath);

  // Security check: ensure path is within BASE_DIR
  if (!fullPath.startsWith(BASE_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  let checkPath = fullPath;
  if (!fs.existsSync(checkPath) && fs.existsSync(checkPath + '.html')) {
    checkPath = checkPath + '.html';
  }

  fs.stat(checkPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + relPath);
      return;
    }

    const ext = path.extname(checkPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(checkPath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolioclone running on port ${PORT}`);
});
