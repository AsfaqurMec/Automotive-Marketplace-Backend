FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "src/server.js"]
