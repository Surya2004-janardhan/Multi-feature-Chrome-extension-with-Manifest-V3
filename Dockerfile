# Use Node.js LTS as base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the extension
RUN npm run build

# Keep the container running for development
CMD ["npm", "run", "watch"]
