FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client and push schema
RUN npx prisma generate
# RUN npx prisma db push  # Uncomment if you want auto-migration on build

COPY . .

RUN mkdir -p /data /uploads && chown -R node:node /data /uploads

ENV DATABASE_URL="file:/data/prod.db"
ENV UPLOADS_DIR=/uploads

VOLUME /data
VOLUME /uploads

EXPOSE 3001
USER node

CMD ["npm", "start"]