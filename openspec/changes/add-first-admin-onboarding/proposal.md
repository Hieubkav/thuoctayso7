## Lý do (Why)

* Hiện tại chưa có bất kỳ tài khoản admin nào nên không thể truy cập khu vực quản trị (admin).
* Cần cung cấp quy trình khởi tạo/thiết lập (onboarding) an toàn theo cách thông dụng của các nền tảng web hiện đại.
* Cần hạn chế người lạ tạo tài khoản admin đầu tiên và đảm bảo nhật ký kiểm toán (log audit) rõ ràng.

## Các thay đổi (What Changes)

* **Kiểm tra trạng thái:** Thêm bước kiểm tra số lượng admin. Nếu số lượng bằng 0, hệ thống sẽ hiển thị trang onboarding thiết lập ban đầu.
* **Xây dựng Form:** Xây dựng form thiết lập gồm các trường: Họ tên, Email, Mật khẩu, Nhập lại mật khẩu và Đồng ý điều khoản.
* **Xử lý Server:** Tạo Route Handler (API endpoint) xử lý ở phía server để tạo người dùng (user): băm (hash) và thêm muối (salt) mật khẩu, gán quyền *super admin* và thực hiện đăng nhập ngay sau khi tạo thành công.
* **Chặn truy cập:** Chặn hoàn toàn trang onboarding sau khi đã có admin đầu tiên và chuyển người dùng về màn hình đăng nhập thông thường.

## Tác động (Impact)

* **Luồng xác thực:** Thêm luồng onboarding mới trong khung NextAuth + Drizzle. Cần cập nhật middleware và guard truy cập khu vực admin.
* **Bảo mật:** Giúp tránh việc rò rỉ thông tin admin do sử dụng tài khoản mặc định yếu, giảm thiểu rủi ro bảo mật.
* **Kiểm thử:** Yêu cầu viết thêm kiểm thử đầu cuối (End-to-End Test - E2E) để đảm bảo người dùng không thể truy cập khu vực admin nếu chưa tạo tài khoản đầu tiên.
