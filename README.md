# Store Manager Backend API

A Node.js and Express backend API for managing store inventory, backed by MongoDB.

## Features

- Complete REST API (CRUD operations)
- Search products by name
- Filter products by category
- Input validation using Mongoose schema
- Structured error handling middleware

## Setup

1. Clone the repository.
2. Run \`npm install\` to install dependencies.
3. Create a \`.env\` file in the root directory (refer to setup instructions for variables: \`PORT\` and \`MONGO_URI\`).
4. Run \`node server.js\` to start the server.

## Deployment to Render

1. Push this repository to your GitHub account.
2. Go to [Render Dashboard](https://dashboard.render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the \`render.yaml\` blueprint (or you can manually configure: Node environment, \`npm install\` as build command, \`node server.js\` as start command).
5. Add the \`MONGO_URI\` environment variable in the Render Dashboard pointing to your MongoDB Atlas cluster.
