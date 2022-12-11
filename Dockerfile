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

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
# Some things are not allowed (see https://github.com/vercel/next.js/issues/38119#issuecomment-1172099259)
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]