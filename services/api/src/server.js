import { createServer } from 'http';

import { Server } from 'socket.io';

import { createApp } from './app.js';

const app = createApp();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN || '*',
  },
});

io.on('connection', (socket) => {
  socket.emit('wallet:event', {
    type: 'connected',
    message: 'Realtime wallet channel connected.',
  });
});

const port = Number(process.env.PORT || 4000);

server.listen(port, () => {
  console.log(`digital-wallet-api listening on http://localhost:${port}`);
});

