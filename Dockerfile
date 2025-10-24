FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY --chown=nextjs:nodejs --from=builder /app/ ./

RUN npm install

# Generate Prisma client and push schema

# RUN npx prisma db push  # Uncomment if you want auto-migration on build

COPY . .

# Create upload directories that will be mounted by docker-compose
# Use the /srv/upload/js-web path so host volumes bind to where docker-compose expects
RUN mkdir -p /srv/upload/js-web/project-images && chown -R node:node /srv/upload/js-web

# Install su-exec so we can drop privileges from the entrypoint
RUN apk add --no-cache su-exec

# Copy entrypoint script and make it executable
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME /srv/upload/js-web
VOLUME /srv/upload/js-web/project-images

ENV DATABASE_URL="file:/srv/upload/js-web/prod.db"
ENV UPLOADS_DIR=/srv/upload/js-web/project-images

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build
ENV NODE_ENV production

# Use paths under /srv/upload/js-web so they match docker-compose mounts


EXPOSE 3001
ENV PORT 3001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "start"]
