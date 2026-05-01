# Hướng Dẫn Sử Dụng Hệ Thống Personal Finance API

Dự án này được xây dựng bằng NestJS, TypeORM, PostgreSQL và quản lý Database bằng Atlas.

---

## 1. Chạy Dự Án Local

### Cách 1: Dùng Docker (Khuyên dùng)
```bash
docker compose up --build
```
Hệ thống sẽ tự khởi động:
- **Server**: http://localhost:3000/api/wallet
- **Database**: PostgreSQL trên port 5432

### Cách 2: Chạy bằng NPM
1. Cài đặt thư viện: `npm install`
2. Cấu hình `.env` (copy từ `.env.example`)
3. Chạy: `npm run start:dev`

---

## 2. Quản Lý Database (Atlas)

Hệ thống **không** tự động đồng bộ DB (`synchronize: false`). Bạn cần dùng Atlas để quản lý schema.

- **Tạo migration mới** (khi bạn thay đổi Entity):
  ```cmd
  ..\\atlas.exe migrate diff --env local
  ```
- **Áp dụng thay đổi vào DB Local**:
  ```cmd
  ..\\atlas.exe migrate apply --env local
  ```

---

## 3. Hướng Dẫn Sử Dụng API

### Bước 1: Đăng ký & Đăng nhập
1. **Đăng ký**: `POST /auth/register` (Body: email, password, name)
2. **Đăng nhập**: `POST /auth/login` -> Nhận về `access_token`.

### Bước 2: Sử dụng các API bảo mật (Giao dịch)
Tất cả các API trong module `transactions` đều yêu cầu xác thực.
- **Header**: `Authorization: Bearer <access_token>`
- **API Danh sách**: `GET /transactions/list`
- **API Thêm giao dịch**: `POST /transactions/create`
  - Body mẫu:
    ```json
    {
      "type": "MONEYIN",
      "money": 500000,
      "categoriesId": "uuid-cua-danh-muc",
      "date": "2026-05-01T15:00:00Z",
      "description": "Thưởng lương"
    }
    ```

---

## 4. Vận Hành Trên Fly.io & CI/CD

### Tự động Deploy từ GitHub
Hệ thống đã được thiết lập CI/CD. Bạn chỉ cần:
1. Đảm bảo đã thêm `FLY_API_TOKEN` vào **GitHub Secrets**.
2. Push code lên nhánh `main`:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
  ```
GitHub sẽ tự động:
- Build image Docker.
- **Tự động chạy Migration Database** (Atlas).
- Deploy phiên bản mới nhất lên server.

### Lệnh Fly.io Thủ Công (Nếu cần)
- **Deploy ngay**: `fly deploy`
- **Xem Log server**: `fly logs`
- **SSH vào server**: `fly ssh console`

---

## 5. Các Lưu Ý Quan Trọng
- **Cấu hình PORT**: Luôn sử dụng `process.env.PORT` (mặc định 3000).
- **Database URL**: Trên production, hệ thống sẽ tự dùng `DATABASE_URL` do Fly.io cung cấp.
- **Định dạng Date**: Luôn dùng chuẩn ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`) để tránh lỗi validation.
