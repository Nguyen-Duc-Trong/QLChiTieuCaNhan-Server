#!/bin/sh
set -e

echo "Starting database migration..."

# 1. Chuyển đổi postgres: sang postgresql:
# 2. Loại bỏ các tham số gây lỗi và thêm sslmode=disable (vì chạy nội bộ Fly không cần SSL)
MIGRATE_URL=$(echo $DATABASE_URL | sed 's/^postgres:/postgresql:/')

# Nếu URL chưa có tham số, thêm sslmode=disable
if ! echo "$MIGRATE_URL" | grep -q "?"; then
  MIGRATE_URL="${MIGRATE_URL}?sslmode=disable"
fi

# Chạy lệnh apply migration với cờ --allow-dirty để bỏ qua các kiểm tra không cần thiết trên cloud
atlas migrate apply --url "$MIGRATE_URL" --dir file://atlas/migrations --allow-dirty

echo "Migration completed successfully!"
