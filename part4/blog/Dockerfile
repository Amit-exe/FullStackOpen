# Use official Node LTS (lightweight alpine variant)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for Docker layer caching)
# If package.json hasn't changed, npm install layer is reused
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the source code
COPY . .

# Expose the port your app runs on
EXPOSE 4001

# Start the server
CMD ["node", "index.js"]