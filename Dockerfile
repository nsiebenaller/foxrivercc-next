### 1. Builder
FROM node:lts-alpine AS builder
WORKDIR /app

# Setup PNPM
RUN npm --silent install --global --depth 0 pnpm

# Add compatibility libraries
RUN apk add --no-cache libc6-compat
RUN apk add openssl
RUN apk update

# Copy source files
COPY . .

# Install dependencies
RUN pnpm install

# Generate prisma client
RUN pnpm prisma generate

# Build app
RUN pnpm build

### 2. Runner
FROM node:lts-alpine AS runner
WORKDIR /app

# Setup PNPM
RUN npm --silent install --global --depth 0 pnpm

# Set environment variables
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG BASE_DOMAIN
ENV BASE_DOMAIN $BASE_DOMAIN

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Some things are not allowed (see https://github.com/vercel/next.js/issues/38119#issuecomment-1172099259)
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]