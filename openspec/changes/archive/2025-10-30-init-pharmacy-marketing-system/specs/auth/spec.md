## ADDED Requirements

### Requirement: Admin Authentication
Hệ thống MUST cung cấp cơ chế xác thực để bảo vệ khu vực quản trị.

#### Scenario: Đăng nhập admin
- **WHEN** người dùng truy cập khu vực quản trị
- **THEN** hệ thống yêu cầu xác thực thông tin đăng nhập

#### Scenario: Xác thực thành công
- **WHEN** người dùng cung cấp thông tin đăng nhập hợp lệ
- **THEN** hệ thống xác thực thành công và cho phép truy cập khu vực quản trị

#### Scenario: Xác thực thất bại
- **WHEN** người dùng cung cấp thông tin đăng nhập không hợp lệ
- **THEN** hệ thống từ chối truy cập và yêu cầu nhập lại thông tin

### Requirement: Credentials Provider
Hệ thống MUST sử dụng NextAuth.js với provider Credentials (email + mật khẩu) để xác thực admin.

#### Scenario: Đăng nhập bằng email và mật khẩu
- **WHEN** admin nhập email và mật khẩu đúng
- **THEN** hệ thống xác thực và cấp quyền truy cập vào dashboard

### Requirement: Password Reset
Hệ thống MUST hỗ trợ chức năng lấy lại mật khẩu qua email để người dùng có thể khôi phục tài khoản khi quên mật khẩu.

#### Scenario: Gửi yêu cầu lấy lại mật khẩu
- **WHEN** người dùng chọn chức năng "Quên mật khẩu" và nhập email
- **THEN** hệ thống gửi email chứa liên kết đặt lại mật khẩu đến địa chỉ email đã đăng ký

#### Scenario: Đặt lại mật khẩu
- **WHEN** người dùng truy cập liên kết trong email và nhập mật khẩu mới
- **THEN** hệ thống cập nhật mật khẩu mới cho tài khoản
