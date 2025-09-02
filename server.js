// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const APP_NAME = process.env.APP_NAME || 'ENGSE203 Super App';

const cors = require('cors');
const helmet = require('helmet');
const Joi = require('joi');

// ---- middleware ----
app.use(helmet({
  // อนุญาตการเชื่อมต่อแบบ WebSocket
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "ws:", "wss:"], // สำคัญสำหรับ socket.io
    },
  },
}));
app.use(cors());
app.use(express.json());

// เสิร์ฟไฟล์ static จาก public/
app.use(express.static('public'));

// ---- REST routes (ของเดิม) ----
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  birth_year: Joi.number().integer().min(1900).max(new Date().getFullYear())
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This data is open for everyone!' });
});

app.post('/api/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Invalid data', details: error.details });
  res.status(201).json({ message: 'User created successfully!', data: value });
});

// ให้หน้าแรกเสิร์ฟไฟล์แชท (public/index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- socket.io ----
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    // ส่งให้ทุกคน
    io.emit('chat message', `[${socket.id.slice(0,6)}]: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ---- start ----
server.listen(PORT, () => {
  console.log(`🚀 ${APP_NAME} (WebSocket) on http://localhost:${PORT}`);
});
