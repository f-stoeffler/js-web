FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client and push schema
RUN npx prisma generate
# RUN npx prisma db push  # Uncomment if you want auto-migration on build

COPY . .

RUN mkdir -p /app-data /app-uploads && chown -R node:node /app-data /app-uploads

ENV DATABASE_URL="file:/app-data/prod.db"
ENV UPLOADS_DIR=/app-uploads

VOLUME /app-data
VOLUME /app-uploads

EXPOSE 3001
USER node

CMD ["npm", "start"]