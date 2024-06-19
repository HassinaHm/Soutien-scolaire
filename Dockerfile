# Stage 1: Build Angular app
FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install  --legacy-peer-deps

COPY . .
RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/soutien-scolaire /usr/share/nginx/html
