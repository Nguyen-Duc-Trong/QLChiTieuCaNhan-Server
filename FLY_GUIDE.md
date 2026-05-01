# Fly.io Cheat Sheet (Hướng dẫn thao tác nhanh)

Tất cả các lệnh dưới đây nên được chạy tại thư mục gốc của dự án. Nếu máy bạn chưa nhận lệnh `fly`, hãy thay bằng đường dẫn: `C:\Users\ADMIN\.fly\bin\flyctl.exe`.

---

## 1. Nhóm Lệnh Deploy (Cập nhật App)
- **Deploy bản mới nhất**:
  ```bash
  fly deploy
  ```
- **Deploy không cần build local (dùng builder của Fly)**:
  ```bash
  fly deploy --remote-only
  ```

---

## 2. Nhóm Lệnh Kiểm Tra & Theo Dõi
- **Xem trạng thái App** (Đang chạy hay lỗi, có bao nhiêu máy):
  ```bash
  fly status
  ```
- **Xem Log trực tiếp** (Rất quan trọng để fix lỗi):
  ```bash
  fly logs
  ```
- **Mở App trên trình duyệt**:
  ```bash
  fly open
  ```

---

## 3. Nhóm Lệnh Database (Postgres)
- **Kết nối trực tiếp vào Database** (để gõ lệnh SQL):
  ```bash
  fly postgres connect --app ql-chi-tieu-ca-nhan-server-db
  ```
- **Xem danh sách các DB đang có**:
  ```bash
  fly postgres list
  ```
- **Gắn/Gỡ kết nối giữa App và DB**:
  ```bash
  fly postgres attach ql-chi-tieu-ca-nhan-server-db
  ```

---

## 4. Nhóm Lệnh Quản Lý Biến Môi Trường (Secrets)
- **Xem danh sách các biến** (chỉ hiện tên, không hiện giá trị để bảo mật):
  ```bash
  fly secrets list
  ```
- **Thêm/Sửa một biến** (Ví dụ JWT_SECRET):
  ```bash
  fly secrets set JWT_SECRET=my_super_secret
  ```
- **Xóa một biến**:
  ```bash
  fly secrets unset MY_VARIABLE
  ```

---

## 5. Nhóm Lệnh Hệ Thống & SSH
- **Truy cập vào terminal của server** (giống như SSH vào Linux):
  ```bash
  fly ssh console
  ```
- **Khởi động lại App**:
  ```bash
  fly apps restart
  ```

---

## 6. Mẹo Fix Lỗi Nhanh
- **Lỗi App không chạy**: Chạy `fly logs` để xem NestJS báo lỗi gì.
- **Lỗi Database**: Kiểm tra xem đã `attach` chưa bằng lệnh `fly secrets list` (phải thấy có `DATABASE_URL`).
- **Lỗi Port**: Kiểm tra file `fly.toml` phần `internal_port` phải là `3000`.
