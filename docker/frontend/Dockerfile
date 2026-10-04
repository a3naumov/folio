FROM node:24-bookworm-slim AS development
WORKDIR /app
USER node

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY src/frontend/package.json src/frontend/package-lock.json ./
RUN npm ci
COPY src/frontend/ ./
RUN npm run build

FROM node:24-bookworm-slim AS production
WORKDIR /app
RUN npm install --global serve@14.2.6 && npm cache clean --force
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
CMD ["serve", "--single", "dist", "--listen", "tcp://0.0.0.0:3000"]
