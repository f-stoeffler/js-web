FROM node:18-alpine

# Create the nextjs user and group first
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Create upload directories and set proper permissions
RUN mkdir -p /srv/upload/js-web/project-images && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /srv/upload/js-web && \
    chown -R nextjs:nodejs /app

# Install su-exec for privilege dropping
RUN apk add --no-cache su-exec

# Copy and setup entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set volumes and environment
VOLUME /srv/upload/js-web
VOLUME /srv/upload/js-web/project-images

ENV DATABASE_URL="file:/srv/upload/js-web/prod.db"
ENV UPLOADS_DIR=/srv/upload/js-web/project-images

# Deploy migrations and build
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm run build

ENV NODE_ENV production
EXPOSE 3001
ENV PORT 3001

# Ensure the cache directory exists with correct permissions
RUN mkdir -p /app/.next/cache/images && \
    chown -R nextjs:nodejs /app/.next/cache

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start"]
