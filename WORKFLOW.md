# Quy Trình Phát Triển & Deploy Hằng Ngày

Dưới đây là các bước bạn cần thực hiện sau khi đã viết code xong một tính năng mới.

---

## Bước 1: Kiểm tra thay đổi Database (Nếu có)
Nếu bạn có thêm cột mới, bảng mới hoặc sửa Entity trong code:
1.  **Tạo file migration mới**:
    ```cmd
    ..\\atlas.exe migrate diff --env local
    ```
    (Lệnh này sẽ so sánh code của bạn với DB local và tạo ra một file SQL mới trong thư mục `atlas/migrations`).

2.  **Kiểm tra file SQL**: Mở thư mục `atlas/migrations` xem file vừa tạo có đúng ý bạn không.

3.  **Cập nhật Database Local**: Bạn cần chạy lệnh này để DB máy mình có bảng mới:
    ```cmd
    ..\\atlas.exe migrate apply --env local
    ```

---

## Bước 2: Chạy thử và Kiểm tra Local
Trước khi đẩy lên server, hãy chắc chắn code chạy tốt ở máy mình:
```bash
docker compose up --build
```
- Truy cập Postman để test thử các API bạn vừa viết.
- Nếu mọi thứ ổn, hãy tắt Docker (`Ctrl + C`).

---

## Bước 3: Đưa code lên GitHub (Tự động Deploy)
Đây là bước quan trọng nhất để kích hoạt hệ thống tự động:
1.  **Lưu code**:
    ```bash
    git add .
    git commit -m "Mô tả tính năng bạn vừa làm"
    ```
2.  **Đẩy lên nhánh main**:
    ```bash
    git push origin main
    ```

---

## Bước 4: Kiểm tra kết quả trên Cloud
Sau khi push xong, bạn không cần làm gì thêm trên máy mình, chỉ cần ngồi xem kết quả:
1.  **Xem GitHub Actions**: Lên trang GitHub của dự án, vào tab **Actions** để xem nó có báo xanh (Success) hay không.
2.  **Xem Log trên Fly.io** (Nếu cần kiểm tra lỗi):
    ```cmd
    C:\Users\ADMIN\.fly\bin\flyctl.exe logs
    ```
3.  **Kiểm tra API thật**: Dùng Postman gọi vào địa chỉ:
    `https://ql-chi-tieu-ca-nhan-server.fly.dev/api/wallet/...`

---

## Tóm tắt "Thần chú" hằng ngày:
1. `atlas migrate diff` (nếu sửa DB)
2. `git add .`
3. `git commit -m "..."`
4. `git push origin main`

**Xong! Toàn bộ việc build, chạy migration trên server, khởi động lại app... đều đã được tự động hóa.**
