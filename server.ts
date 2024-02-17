import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import WebSocket from 'ws';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  const httpServer = createServer(server);
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    ws.send('WebSocket connection established');
  });

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, socket, head);
    });
  });

  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  const httpServer = createServer(server);
  const wss = new WebSocket.Server({ server: httpServer }); // Specify the HTTP server

  httpServer.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    ws.send('WebSocket connection established');
  });
}

run();
