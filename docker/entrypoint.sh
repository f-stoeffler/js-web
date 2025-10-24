#!/bin/sh
set -e

# Ensure directories exist
mkdir -p /srv/upload/js-web /srv/upload/js-web/project-images

# Try to set ownership to node user so the node process can write.
# If chown fails (platform differences), we continue anyway.
chown -R node:node /srv/upload/js-web || true

# Run Prisma migrations (deploy is suitable for production-like environments)
echo "Running Prisma migrations..."
npx prisma migrate deploy || echo "Prisma migrate deploy failed or no migrations to apply"

# Finally, start the app as the node user
exec su-exec node "$@"

