#!/bin/sh
set -e

echo "Starting database migration..."

# Fly.io dùng PgBouncer ở port 6543 (không hỗ trợ search_path)
# Migration phải kết nối TRỰC TIẾP vào PostgreSQL ở port 5432 (bỏ qua PgBouncer)
MIGRATE_URL=$(echo $DATABASE_URL \
  | sed 's/^postgres:/postgresql:/' \
  | sed 's/:6543\//:5432\//')

echo "Connecting directly to PostgreSQL (bypassing PgBouncer)..."

atlas migrate apply --url "$MIGRATE_URL" --dir file://atlas/migrations --allow-dirty

echo "Migration completed successfully!"
