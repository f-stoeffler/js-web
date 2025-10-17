FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client and push schema
RUN npx prisma generate
# RUN npx prisma db push  # Uncomment if you want auto-migration on build

COPY . .

# Create upload directories that will be mounted by docker-compose
# Use the /srv/upload/js-web path so host volumes bind to where docker-compose expects
RUN mkdir -p /srv/upload/js-web/project-images && chown -R node:node /srv/upload/js-web

RUN npm run build
ENV NODE_ENV production

# Use paths under /srv/upload/js-web so they match docker-compose mounts
ENV DATABASE_URL="file:/srv/upload/js-web/prod.db"
ENV UPLOADS_DIR=/srv/upload/js-web/project-images

VOLUME /srv/upload/js-web
VOLUME /srv/upload/js-web/project-images

EXPOSE 3001
ENV PORT 3001
USER node

CMD ["npm", "run", "start:prod"]