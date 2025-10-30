## 1. Kiểm tra trạng thái admin

* [ ] 1.1. Thêm hàm server kiểm tra số lượng người dùng (user) có vai trò admin.
* [ ] 1.2. Cập nhật middleware/guard admin, chuyển hướng người dùng về trang setup nếu chưa có admin nào tồn tại.

## 2. Giao diện Onboarding (Onboarding UI)

* [ ] 2.1. Tạo route `app/(admin)/setup` hiển thị form thiết lập ban đầu.
* [ ] 2.2. Xây dựng form sử dụng React Hook Form + Zod, bao gồm validate về mật khẩu và điều khoản dịch vụ (agreement).

## 3. Tạo tài khoản Super Admin

* [ ] 3.1. Tạo API route POST `/api/admin/setup` xử lý logic tạo tài khoản đầu tiên.
* [ ] 3.2. Băm (hash) và thêm muối (salt) mật khẩu, lưu dữ liệu vào bảng user với cờ (flag) *super admin* và ghi nhận thông tin kiểm toán (audit).
* [ ] 3.3. Đăng nhập người dùng sau khi tạo thành công và chuyển hướng về trang dashboard admin.

## 4. Kiểm thử và bảo mật (Test & Security)

* [ ] 4.1. Viết unit test cho logic validate form và service tạo admin đầu tiên.
* [ ] 4.2. Viết Playwright/Integration test đảm bảo trang setup chỉ hiển thị khi không có admin và bị khóa lại sau khi tài khoản admin đầu tiên được tạo.
