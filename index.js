import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as pty from 'node-pty';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

const PORT = 3000;

io.on('connection', (socket) => {
  const shell = pty.spawn('sh', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME || '/root',
    env: process.env,
  });

  shell.on('data', (data) => {
    socket.emit('output', data);
  });

  socket.on('input', (data) => {
    shell.write(data);
  });

  socket.on('resize', ({ cols, rows }) => {
    shell.resize(cols, rows);
  });

  socket.on('disconnect', () => {
    shell.kill();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Terminal server running on http://0.0.0.0:${PORT}`);
});
