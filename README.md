# Real-time Chat & Validated REST API (Express + Socket.IO)

**A small Node.js server combining a secured REST API (Helmet, CORS, Joi validation) with a real-time multi-user chat room over WebSockets.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)

> **ENGSE203, Lab 5:** dotenv, CORS, Helmet, Joi, API testing and Socket.IO.

## Features

- **Real-time chat** at `/`: every connected browser receives messages instantly via Socket.IO. Messages are rendered with `textContent` (XSS-safe), and the server ignores empty or oversized messages.
- **Validated REST API:** `POST /api/users` validates the username (alphanumeric, 3–30 chars), password pattern and birth year with Joi, returns all problems with `400`, and never echoes the password back.
- **Security headers:** Helmet with a Content-Security-Policy that still allows the WebSocket connection (`connect-src 'self' ws: wss:`).
- **Config via `.env`:** `PORT`, `APP_NAME`.

## Run

```bash
git clone https://github.com/tawan230666/engse203-backend.git
cd engse203-backend
cp .env.example .env
npm install
npm run dev          # open http://localhost:3001 in two browser tabs and chat
```

```bash
curl http://localhost:3001/api/data
curl -X POST http://localhost:3001/api/users -H "Content-Type: application/json" \
  -d '{"username":"tawan","password":"abc123","birth_year":2005}'
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/data` | Public sample data |
| `POST` | `/api/users` | Validated user creation |
| `WS` | `chat message` event | Broadcast a chat message to everyone |

---

**Author:** Tawan Tiphkun (ธาวัน ทิพคุณ), [@tawan230666](https://github.com/tawan230666), Software Engineering, RMUTL Chiang Mai
