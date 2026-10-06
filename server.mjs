import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

const distDirectory = resolve('dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://deployment.invalid').pathname);
    let filePath = resolve(distDirectory, `.${pathname}`);

    if (filePath !== distDirectory && !filePath.startsWith(`${distDirectory}${sep}`)) {
      response.writeHead(403).end();
      return;
    }

    let fileInfo = await stat(filePath).catch(() => undefined);
    if (fileInfo?.isDirectory()) {
      filePath = join(filePath, 'index.html');
      fileInfo = await stat(filePath).catch(() => undefined);
    }

    if (!fileInfo?.isFile()) {
      response.writeHead(404).end('Not Found');
      return;
    }

    response.writeHead(200, {
      'Content-Length': fileInfo.size,
      'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });

    if (request.method === 'HEAD') {
      response.end();
    } else {
      createReadStream(filePath).pipe(response);
    }
  } catch {
    response.writeHead(400).end('Bad Request');
  }
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, process.env.HOST ?? '0.0.0.0');