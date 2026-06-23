# ── Stage 1: Build ──────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite build outputs to /app/dist
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────
FROM nginx:alpine

# Copy built React files into Nginx's serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config (we'll write this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]