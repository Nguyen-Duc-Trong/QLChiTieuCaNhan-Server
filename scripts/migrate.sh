#!/bin/sh
set -e

echo "Starting database migration with psql..."

# Dùng psql trực tiếp thay vì Atlas CLI để tránh lỗi PgBouncer search_path
DB_URL="$DATABASE_URL"

# Tạo bảng tracking migration nếu chưa có
psql "$DB_URL" -c "
CREATE TABLE IF NOT EXISTS _atlas_schema_revisions (
  version VARCHAR(255) PRIMARY KEY,
  applied_at TIMESTAMP DEFAULT NOW()
);" 2>/dev/null || true

# Chạy từng file migration SQL theo thứ tự, bỏ qua nếu đã chạy rồi
for file in $(ls /app/atlas/migrations/*.sql 2>/dev/null | sort); do
  version=$(basename "$file" .sql)

  # Kiểm tra migration đã được apply chưa
  count=$(psql "$DB_URL" -t -c "SELECT COUNT(*) FROM _atlas_schema_revisions WHERE version='$version';" 2>/dev/null | tr -d ' ')

  if [ "$count" = "0" ] || [ -z "$count" ]; then
    echo "Applying migration: $version"
    psql "$DB_URL" -f "$file"
    psql "$DB_URL" -c "INSERT INTO _atlas_schema_revisions (version) VALUES ('$version');" 2>/dev/null || true
    echo "✓ Applied: $version"
  else
    echo "⏭ Skipped (already applied): $version"
  fi
done

echo "Migration completed successfully!"
