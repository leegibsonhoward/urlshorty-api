# 🚀 UrlShorty API

A lightweight URL shortener API built with TypeScript and Express.

UrlShorty allows users to create shortened URLs, redirect short links, manage stored URLs, and persist data using JSON file storage.

---

# ✨ Features

- 🔗 Create shortened URLs
- ↪️ Redirect short URLs
- 📋 List stored URLs
- 🗑 Delete shortened URLs
- 💾 Persistent SQLite storage
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
│  └─ urlshorty.db
│
├─ requests/
│  ├─ environments/
│  ├─ opencollection.yml
│  └─ ...
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

---

# 🧪 API Requests

This project includes a Bruno API collection located in:

```txt
requests/
```

The collection contains example requests for testing the API locally or against the deployed production service.

## Environments

Two collection environments are included:

| Environment | Base URL |
|-------------|----------|
| local | `http://localhost:3000` |
| production | `https://urlshorty-api.onrender.com` |

Switching environments allows the same requests to be used against either instance without modifying URLs.

## Included Requests

- Root
- Health Check
- Create URL
- Get URLs
- Delete URL
- Redirect

All requests use:

```txt
{{baseUrl}}
```

so they automatically target the selected environment.

## Using Bruno

1. Install Bruno.
2. Open the collection located in:

```txt
requests/
```

3. Select either the `local` or `production` environment.
4. Execute requests directly from the collection.

This allows the API to be tested without modifying request URLs or maintaining separate collections.

---

---

# 📡 API Endpoints

---

## 🏠 Root

### GET `/`

Returns basic information about the API.

### Example Response

```json
{
  "name": "UrlShorty API",
  "description": "A lightweight URL shortener API built with Express and TypeScript.",
  "github": "https://github.com/YOUR_USERNAME/urlshorty-api",
  "health": "/api/health"
}
```

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

## 🔗 Create URL

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

## 📋 Get URLs

### GET `/api/urls`

Returns all stored shortened URLs.

---

## 🗑 Delete URL

### DELETE `/api/urls/:id`

Deletes a shortened URL by ID.

---

## ↪️ Redirect

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

- PostgreSQL support
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