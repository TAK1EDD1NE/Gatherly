# Use Node.js with Windows-compatible Linux environment
FROM node:18-alpine

WORKDIR /backend

# Handle Windows line endings
RUN apk add --no-cache dos2unix
COPY package*.json ./
RUN dos2unix package*.json

# Install dependencies
RUN npm ci --only=production

# Copy app files and fix line endings
COPY . .
RUN find . -type f -exec dos2unix {} \;

# Healthcheck for Windows compatibility
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080
CMD ["node", "app.js"]