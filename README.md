# mimic-backend

Backend service for the portfolio site that aggregates data from multiple APIs, filters it, and serves it to the frontend.  
The main purpose of this project is to handle all API logic privately while allowing others to understand and replicate the functionality with their own credentials.  

## Overview

This backend collects and processes data from:
- **First GitHub API** — Fetches repositories filtered by the `featured` tag.
- **Second GitHub API** — Retrieves contribution statistics.
- **Literal API** — Fetches currently reading books.  

Each API endpoint returns processed JSON data that can be used by any frontend application.  
To keep sensitive data secure, all personal tokens and credentials have been removed.  
You can clone this repository and use your own API keys to test and extend the project.  

### API Routes

| Route | Description |
|-------|--------------|
| `/api/github` | Returns featured repositories from GitHub API. |
| `/api/github-status` | Returns GitHub contribution status using GraphQL. |
| `/api/literal` | Returns current reading list from Literal API. |

---

## 🛠️ Tech Stack

- [Express.js](https://expressjs.com) — Web framework for Node.js  
- [TypeScript](https://www.typescriptlang.org) — Type-safe development  
- [Axios](https://axios-http.com) — HTTP client for API calls  
- [dotenv](https://github.com/motdotla/dotenv) — Environment variable management  
- [cors](https://www.npmjs.com/package/cors) — Middleware for cross-origin requests  
- [node-cache](https://www.npmjs.com/package/node-cache) — Simple caching layer  
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) — Basic rate limiting middleware  

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn

### Installation

```bash
$ git clone https://github.com/Glory42/mimic-backend.git
$ cd mimic-backend
$ npm install
$ npm run dev
```

Server runs locally on `http://localhost:3000` by default.

---

## 🔐 Environment Variables

An `.env.example` file is included for reference.  
To set up your environment, create a `.env` file in the root directory and fill in your tokens:

```
GITHUB_TOKEN=your_github_token
LITERAL_API_KEY=your_literal_api_key
```
(Adjust based on the APIs you’re using.)

---

## 🧠 Notes

- This backend mimics the private backend used for the portfolio site.
- API keys and credentials are intentionally excluded.
- You can fork and experiment by adding your own credentials and expanding the routes.

---

## 📄 License

This project is licensed under the GNU General Public License v3.0.  
See the [LICENSE](LICENSE) file for more information.