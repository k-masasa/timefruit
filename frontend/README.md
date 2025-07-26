# Timefruit Frontend

A modern web application built with Nuxt.js (Vue.js) for tracking time investments.

## Features

- **Time Recording**: Record time spent on different categories (仕事/勉強/運動/副業/その他)
- **Daily Overview**: View today's records with total hours
- **Responsive Design**: Beautiful gradient UI that works on all devices
- **Real-time Updates**: Automatic refresh after adding/deleting records

## Tech Stack

- **Framework**: Nuxt.js 4.0+ (Vue.js 3.5+)
- **Language**: TypeScript
- **Styling**: CSS with modern gradients
- **Build Tool**: Vite
- **Package Manager**: npm

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

- `NUXT_PUBLIC_BACKEND_URL`: Backend API URL (default: http://localhost:3001)

## Docker

The application is containerized and can be run with Docker Compose:

```bash
docker compose up --build
```

Access the application at http://localhost:3000
