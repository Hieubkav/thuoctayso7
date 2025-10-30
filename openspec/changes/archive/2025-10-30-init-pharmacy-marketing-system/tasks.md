## 1. Cấu trúc Dự án
- [x] 1.1 Tạo cấu trúc thư mục theo quy định: app/(marketing), app/(admin), components/ui, features/, lib/
- [x] 1.2 Thiết lập file cấu hình Next.js (next.config.js), Tailwind (tailwind.config.js), ESLint, Prettier
- [x] 1.3 Cài đặt các thư viện cần thiết: Next.js 16, Tailwind CSS, shadcn/ui, lucide-react, v.v.

## 2. Cấu hình Cơ sở dữ liệu
- [x] 2.1 Thiết lập Neon Postgres
- [x] 2.2 Cài đặt Drizzle ORM
- [x] 2.3 Tạo schema cho products, services, articles, admin users theo yêu cầu spec
- [x] 2.4 Thêm bảng/column hỗ trợ đặt lại mật khẩu (reset tokens, expiry) và đảm bảo trường mật khẩu admin lưu ở dạng đã mã hóa

## 3. Xác thực và Quản lý Trạng thái
- [x] 3.1 Cài đặt NextAuth.js với provider Credentials
- [x] 3.2 Thiết lập hệ thống xác thực admin
- [x] 3.3 Cài đặt Zustand cho quản lý trạng thái
- [x] 3.4 Tích hợp cơ chế băm mật khẩu (vd. bcrypt) khi tạo/cập nhật admin user
- [x] 3.5 Xây dựng flow yêu cầu đặt lại mật khẩu (UI + API gửi email, tạo token)
- [x] 3.6 Xây dựng flow đặt lại mật khẩu (xác thực token, cập nhật mật khẩu mới)

## 4. Giao diện Người dùng
- [x] 4.1 Thiết lập UI components với shadcn/ui
- [x] 4.2 Tạo layout cho marketing và admin đúng cấu trúc Header/Footer/Speedial nêu trong spec
- [x] 4.3 Phát triển các components chung: hero, giới thiệu dịch vụ, danh mục thuốc, sản phẩm, bài viết, bản đồ chỉ đường

## 5. Tính năng Marketing
- [x] 5.1 Tạo landing page giới thiệu quầy thuốc
- [x] 5.2 Phát triển trang hiển thị sản phẩm/dịch vụ
- [x] 5.3 Bổ sung nội dung/CTA liên hệ phù hợp với yêu cầu landing page

## 6. Tính năng Quản trị
- [x] 6.1 Tạo dashboard admin
- [x] 6.2 Phát triển form quản lý sản phẩm
- [x] 6.3 Tạo form quản lý bài viết/dịch vụ

## 7. Kiểm thử
- [x] 7.1 Thiết lập Vitest và @testing-library/react
- [x] 7.2 Viết unit test cho helper và store Zustand
- [x] 7.3 Thiết lập Playwright cho E2E testing

## 8. Triển khai
- [x] 8.1 Cấu hình Vercel deployment
- [x] 8.2 Thiết lập CI/CD pipeline
- [x] 8.3 Tích hợp Vercel Analytics và ghi nhận Web Vitals/thời gian tải cho yêu cầu Performance Monitoring
