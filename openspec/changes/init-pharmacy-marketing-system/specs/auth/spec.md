## ADDED Requirements

### Requirement: Admin Authentication
Hệ thống PHẢI cung cấp cơ chế xác thực để bảo vệ khu vực quản trị.

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
Hệ thống PHẢI sử dụng NextAuth.js với provider Credentials (email + mật khẩu) để xác thực admin.

#### Scenario: Đăng nhập bằng email và mật khẩu
- **WHEN** admin nhập email và mật khẩu đúng
- **THEN** hệ thống xác thực và cấp quyền truy cập vào dashboard

### Requirement: OTP Authentication (Optional)
Hệ thống CÓ THỂ hỗ trợ xác thực OTP qua email sử dụng Resend để tăng cường bảo mật.

#### Scenario: Gửi OTP
- **WHEN** admin chọn xác thực OTP
- **THEN** hệ thống gửi mã OTP đến email đã đăng ký

#### Scenario: Xác thực OTP
- **WHEN** admin nhập mã OTP đúng
- **THEN** hệ thống xác thực và cấp quyền truy cập vào dashboard