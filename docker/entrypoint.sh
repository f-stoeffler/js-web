#!/bin/sh
set -e

# Ensure directories exist
mkdir -p /srv/upload/js-web /srv/upload/js-web/project-images

# Ensure Next.js cache directories exist and are writable
mkdir -p /app/.next/cache/images

# Try to set ownership to node user so the node process can write.
# If chown fails (platform differences), we continue anyway.
chown -R node:node /srv/upload/js-web || true
chown -R node:node /app/.next/cache || true

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy || echo "Prisma migrate deploy failed or no migrations to apply"

# Seed the database only if it's empty
echo "Database is empty, running seeds..."
npx prisma db seed

# Finally, start the app as the node user
exec su-exec node "$@"
