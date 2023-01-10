FROM node:18-alpine AS node-builder

WORKDIR /app

RUN mkdir -p /app/node_modules


FROM node-builder AS node-setup-local

COPY . /app

ENTRYPOINT []
