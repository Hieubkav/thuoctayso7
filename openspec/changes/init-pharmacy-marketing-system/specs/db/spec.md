## ADDED Requirements

### Requirement: Database Schema
Hệ thống MUST sử dụng Vercel Postgres với schema được định nghĩa qua Drizzle ORM để lưu trữ dữ liệu.

#### Scenario: Tạo bảng sản phẩm
- **WHEN** hệ thống khởi tạo cơ sở dữ liệu
- **THEN** hệ thống tạo bảng products với các trường cần thiết

#### Scenario: Tạo bảng bài viết
- **WHEN** hệ thống khởi tạo cơ sở dữ liệu
- **THEN** hệ thống tạo bảng articles với các trường cần thiết

#### Scenario: Tạo bảng dịch vụ
- **WHEN** hệ thống khởi tạo cơ sở dữ liệu
- **THEN** hệ thống tạo bảng services với các trường cần thiết

### Requirement: Product Data Model
Hệ thống MUST lưu trữ thông tin sản phẩm bao gồm tên, mô tả, hình ảnh, giá và trạng thái.

#### Scenario: Lưu thông tin sản phẩm
- **WHEN** admin thêm hoặc cập nhật sản phẩm
- **THEN** hệ thống lưu trữ đầy đủ thông tin sản phẩm vào cơ sở dữ liệu

### Requirement: Article Data Model
Hệ thống MUST lưu trữ thông tin bài viết bao gồm tiêu đề, nội dung, mô tả ngắn, hình ảnh và ngày đăng.

#### Scenario: Lưu thông tin bài viết
- **WHEN** admin thêm hoặc cập nhật bài viết
- **THEN** hệ thống lưu trữ đầy đủ thông tin bài viết vào cơ sở dữ liệu

### Requirement: Service Data Model
Hệ thống MUST lưu trữ thông tin dịch vụ bao gồm tên, mô tả, hình ảnh và trạng thái.

#### Scenario: Lưu thông tin dịch vụ
- **WHEN** admin thêm hoặc cập nhật dịch vụ
- **THEN** hệ thống lưu trữ đầy đủ thông tin dịch vụ vào cơ sở dữ liệu

### Requirement: Admin User Data Model
Hệ thống MUST lưu trữ thông tin người dùng admin bao gồm email, mật khẩu đã mã hóa và quyền hạn.

#### Scenario: Lưu thông tin admin
- **WHEN** hệ thống tạo tài khoản admin
- **THEN** hệ thống lưu trữ thông tin admin vào cơ sở dữ liệu với mật khẩu đã mã hóa
