#!/bin/sh
set -e

echo "Starting database migration..."

# 1. Chuyển đổi sang postgresql:// và LOẠI BỎ hoàn toàn các tham số sau dấu ?
# Việc giữ URL "sạch" giúp driver không tự ý gửi các tham số startup gây lỗi
MIGRATE_URL=$(echo $DATABASE_URL | sed 's/^postgres:/postgresql:/' | sed 's/?.*//')

echo "Connecting to database with clean URL..."

# 2. Chạy lệnh apply migration
# Chúng ta không thêm bất kỳ options nào vào URL nữa
atlas migrate apply --url "$MIGRATE_URL" --dir file://atlas/migrations --allow-dirty

echo "Migration completed successfully!"
