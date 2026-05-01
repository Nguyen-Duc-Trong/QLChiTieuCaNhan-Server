#!/bin/sh
set -e

echo "Starting database migration..."

# 1. Lấy URL cơ bản (loại bỏ các tham số cũ nếu có và đổi scheme)
BASE_URL=$(echo $DATABASE_URL | sed 's/?.*//' | sed 's/^postgres:/postgresql:/')

# 2. Xây dựng URL mới với tham số options để tránh lỗi search_path startup
# Chúng ta dùng options=-c%20search_path%3Dpublic để thiết lập schema một cách an toàn
MIGRATE_URL="${BASE_URL}?sslmode=disable&options=-c%20search_path%3Dpublic"

echo "Connecting to database..."

# 3. Chạy lệnh apply migration
atlas migrate apply --url "$MIGRATE_URL" --dir file://atlas/migrations --allow-dirty

echo "Migration completed successfully!"
