## Kiến trúc tổng quan

* **Thêm hàm Server:** Bổ sung hàm server `getAdminCount` sử dụng Drizzle để kiểm tra số lượng người dùng (user) có vai trò admin.
* **Kiểm soát truy cập:** Layout admin sẽ gọi hàm này ở phía server. Nếu số lượng admin hiện tại là 0, hệ thống sẽ chuyển hướng (redirect) người dùng sang `/admin/setup` và chặn truy cập các route admin khác.
* **Trang Setup:** Trang `app/(admin)/setup/page.tsx` sẽ hiển thị (render) một Server Component để đọc trạng thái (admin count) và một Client Component chứa form đăng ký.

## Xử lý backend

* **Kiểm tra điều kiện:** Route POST `/api/admin/setup` chỉ được phép hoạt động khi `getAdminCount() === 0`. Nếu có admin đã tồn tại, API sẽ trả về lỗi 409 Conflict.
* **Tạo người dùng:**
  * Mã hóa mật khẩu bằng Argon2.
  * Gán các cột mặc định cho người dùng đầu tiên: `role = 'admin'`, `is_super_admin = true`, và `email_verified_at = now()`.
* **Đăng nhập:** Sau khi tạo người dùng thành công, gọi `signIn('credentials')` để đăng nhập ngay lập tức và trả về JSON có dạng: `{redirect: '/admin/dashboard'}`.

## UX và bảo mật (Security & User Experience)

* **Quy tắc mật khẩu:** Form yêu cầu mật khẩu tối thiểu 12 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.
* **Thông điệp rõ ràng:** Hiển thị thông điệp giải thích rõ ràng rằng đây là bước cài đặt lần đầu (First-time setup), cùng một nút quay lại trang chủ nếu người dùng vào nhầm.
* **Ghi log Audit:** Ghi log (Log) lại thông tin IP và user-agent khi tạo tài khoản admin đầu tiên để phục vụ mục đích kiểm toán (audit) bảo mật sau này.
