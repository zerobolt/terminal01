# My Terminal Backend

This is a Node.js backend for a web-based terminal application. It uses Express and Socket.IO to provide a real-time terminal experience.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the server:
   ```bash
   node index.js
   ```

## Docker

To run the application in a Docker container:

```bash
docker build -t my-terminal-backend .
docker run -it -p 3000:3000 my-terminal-backend
```

## Features

- Real-time terminal interaction
- Persistent terminal sessions
- Docker support 