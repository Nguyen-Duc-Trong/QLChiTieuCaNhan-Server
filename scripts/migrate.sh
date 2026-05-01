#!/bin/sh
set -e

echo "Starting database migration..."

# Chuyển đổi postgres: sang postgresql: để Atlas nhận diện đúng driver
MIGRATE_URL=$(echo $DATABASE_URL | sed 's/^postgres:/postgresql:/')

# Chạy lệnh apply migration
atlas migrate apply --url "$MIGRATE_URL" --dir file://atlas/migrations

echo "Migration completed successfully!"
