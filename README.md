# 🚀 UrlShorty API

A lightweight URL shortener API built with TypeScript and Express.

UrlShorty allows users to create shortened URLs, redirect short links, manage stored URLs, and persist data using JSON file storage.

---

# ✨ Features

- 🔗 Create shortened URLs
- ↪️ Redirect short URLs
- 📋 List stored URLs
- 🗑 Delete shortened URLs
- 💾 Persistent JSON storage
- ✅ URL validation
- ♻️ Duplicate URL prevention
- ⚡ Lightweight and modular architecture

---

# 🧰 Tech Stack

- TypeScript
- Express
- Node.js
- Nano ID

---

# 📁 Project Structure

```txt
urlshorty-api/
├─ data/
│  └─ urls.json
│
├─ src/
│  ├─ routes/
│  ├─ services/
│  ├─ storage/
│  ├─ types/
│  ├─ utils/
│  └─ server.ts
│
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd urlshorty-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create a `.env` file in the project root:

```env
PORT=3000
BASE_URL=http://localhost:3000
```

---

# 🧪 Development

Start the development server:

```bash
npm run dev
```

---

# 📦 Production Build

Build the TypeScript project:

```bash
npm run build
```

Start the compiled server:

```bash
npm start
```

---

# 📡 API Endpoints

---

## ❤️ Health Check

### GET `/api/health`

Checks whether the API server is running.

### Example Response

```json
{
  "status": "ok",
  "message": "UrlShorty API is running"
}
```

---

## 🔗 Create Short URL

### POST `/api/urls`

Creates a shortened URL.

### Request Body

```json
{
  "originalUrl": "https://google.com"
}
```

### Example Response

```json
{
  "id": "123",
  "originalUrl": "https://google.com",
  "shortCode": "AbC123x",
  "visitCount": 0,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "shortUrl": "http://localhost:3000/AbC123x"
}
```

---

## 📋 Get All URLs

### GET `/api/urls`

Returns all stored shortened URLs.

---

## 🗑 Delete Short URL

### DELETE `/api/urls/:id`

Deletes a shortened URL by ID.

---

## ↪️ Redirect Short URL

### GET `/:shortCode`

Redirects the user to the original URL.

Example:

```txt
http://localhost:3000/AbC123x
```

---

# 🧠 Architecture

This project uses a simple modular architecture:

```txt
Request
→ Route
→ Service
→ Storage
→ Response
```

The goal is to keep the codebase:

- simple
- readable
- modular
- beginner-friendly
- easy to expand later

---

# 🛣 Future Improvements

- SQLite or PostgreSQL support
- Custom short codes
- Analytics tracking
- Frontend dashboard
- Authentication
- Rate limiting
- QR code generation
- Docker support

---

# 📜 Scripts

```bash
npm run dev
npm run build
npm start
```

---

# 📄 License

MIT