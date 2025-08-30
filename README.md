# NURE Answers - Frontend

This repository contains the frontend code for NURE Answers platform - a free resource for university students to access test answers across the country.

## 🌟 Overview

NURE Answers aims to simplify the learning process by collecting test answers in one place, allowing students to spend less time searching and more time learning. As our homepage states: "Learning is easy! On NURE Answers, all tests are collected in one place to search less and learn more. Visit and level up your knowledge!"

## 🚀 Technology Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - A powerful Vue.js framework

## 🔰 Getting Started

1. App requires Node.js 22 or larger. First of all make sure that your Node.js version is compatible with requirements.

2. Clone the repository:
```bash
git clone https://github.com/mindenit-answers/client.git
cd client
```

3. Install dependencies using `pnpm`:
```bash
pnpm i
```

4. Copy `.env.example` to new `.env` file and configure the variables:
```
PORT=3000                                      # Port on which the application will run
BASE_URL=http://localhost:3000                 # Base URL of the site, used for SEO optimization and some functions
API_BASE_URL=http://localhost:3000/api         # Backend API URL
DISCORD_WEBHOOK_URL=your_discord_webhook_url   # Discord webhook URL for sending notifications
```

5. Run the application:
```bash
# Start development server
pnpm dev

# or for production
pnpm build
pnpm start

# or for production with Docker
docker-compose up -d
```

## 📁 Project Structure

The project follows a layered architecture:

- `core/` - Contains reusable code that's shared across the application
- `layers/` - Additional layers for different parts of the application

## 🔌 API Integration

This frontend connects to a separate API repository for data operations. API documentation can be found in the backend repository.

## 📜 License

This project is licensed under the [GNU GPL v3.0 license](https://github.com/mindenit-answers/client/blob/main/LICENSE).
