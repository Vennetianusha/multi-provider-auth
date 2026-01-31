# 🔐 Multi-Provider OAuth 2.0 Authentication Service

A production-ready authentication service built with **Node.js, Express, PostgreSQL, Redis, and Docker**, implementing modern authentication and authorization standards.

This project is built as part of the **Partnr Network – Global Placement Program**.

---

## 🚀 Features

- 🔐 Local authentication (email & password)
- 🔗 OAuth 2.0 authentication (Google & GitHub)
- 🔁 JWT access & refresh token flow
- 👤 Protected user profile endpoints
- 🛡️ Role-Based Access Control (RBAC)
- ⏱️ Rate limiting to prevent brute-force attacks
- 🐳 Fully containerized using Docker & Docker Compose
- 🧠 Redis-backed rate limiting
- 🗄️ PostgreSQL database with seed data

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Cache:** Redis  
- **Authentication:** JWT, OAuth 2.0  
- **Security:** bcrypt, RBAC, rate limiting  
- **Containerization:** Docker, Docker Compose  

---

## 📁 Project Structure

```text
.
├── src
│   ├── app.js
│   ├── server.js
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   └── utils
├── seeds
│   ├── 001_init.sql
│   └── 002_users.sql
├── tests
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── submission.json
└── README.md
⚙️ Environment Variables

Create a .env file using the template below:

# Application
API_PORT=8080

# Database (PostgreSQL)
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=auth_service
DATABASE_URL=postgresql://user:password@db:5432/auth_service

# Cache (Redis)
REDIS_URL=redis://cache:6379

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret


⚠️ Never commit real secrets. Only .env.example should be committed.

🐳 Running the Project (Docker)
1️⃣ Build & Start Containers
docker-compose up --build

2️⃣ Verify Health

Open in browser:

http://localhost:8080/health


Expected response:

{
  "status": "OK",
  "db": "connected"
}

🔑 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
POST	/api/auth/refresh	Refresh access token
OAuth
Method	Endpoint
GET	/api/auth/google
GET	/api/auth/github
GET	/api/auth/google/callback
GET	/api/auth/github/callback
Users
Method	Endpoint	Access
GET	/api/users/me	Authenticated
GET	/api/users	Admin only
🧪 OAuth Testing (Important)

OAuth redirect endpoints return 302 redirects.

Callback endpoints are tested using simulated provider data.

Example:
GET /api/auth/google/callback
?provider_user_id=12345
&email=oauthuser@gmail.com
&name=OAuthUser

Expected response:
{
  "accessToken": "...",
  "refreshToken": "..."
}

🛡️ Security Features

Password hashing with bcrypt

JWT-based stateless authentication

Refresh token mechanism

Redis-backed rate limiting

Role-Based Access Control (RBAC)

🧑‍💻 Test Credentials

Test users are defined in submission.json and are seeded into the database on startup.
✅ Submission Checklist

 Dockerized application

 PostgreSQL + Redis services

 JWT authentication & refresh tokens

 OAuth (Google & GitHub)

 Role-Based Access Control (RBAC)

 Rate limiting

 .env.example

 submission.json

 Complete README.md

📌 Notes

This project follows backend best practices and is designed to be secure, scalable, and production-ready.
