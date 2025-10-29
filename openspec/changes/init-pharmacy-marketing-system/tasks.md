## 1. Cấu trúc Dự án
- [ ] 1.1 Tạo cấu trúc thư mục theo quy định: app/(marketing), app/(admin), components/ui, features/, lib/
- [ ] 1.2 Thiết lập file cấu hình Next.js (next.config.js), Tailwind (tailwind.config.js), ESLint, Prettier
- [ ] 1.3 Cài đặt các thư viện cần thiết: Next.js 16, Tailwind CSS, shadcn/ui, lucide-react, v.v.

## 2. Cấu hình Cơ sở dữ liệu
- [ ] 2.1 Thiết lập Vercel Postgres
- [ ] 2.2 Cài đặt Drizzle ORM
- [ ] 2.3 Tạo schema cho products, services, articles, admin users theo yêu cầu spec
- [ ] 2.4 Thêm bảng/column hỗ trợ đặt lại mật khẩu (reset tokens, expiry) và đảm bảo trường mật khẩu admin lưu ở dạng đã mã hóa

## 3. Xác thực và Quản lý Trạng thái
- [ ] 3.1 Cài đặt NextAuth.js với provider Credentials
- [ ] 3.2 Thiết lập hệ thống xác thực admin
- [ ] 3.3 Cài đặt Zustand cho quản lý trạng thái
- [ ] 3.4 Tích hợp cơ chế băm mật khẩu (vd. bcrypt) khi tạo/cập nhật admin user
- [ ] 3.5 Xây dựng flow yêu cầu đặt lại mật khẩu (UI + API gửi email, tạo token)
- [ ] 3.6 Xây dựng flow đặt lại mật khẩu (xác thực token, cập nhật mật khẩu mới)

## 4. Giao diện Người dùng
- [ ] 4.1 Thiết lập UI components với shadcn/ui
- [ ] 4.2 Tạo layout cho marketing và admin đúng cấu trúc Header/Footer/Speedial nêu trong spec
- [ ] 4.3 Phát triển các components chung: hero, giới thiệu dịch vụ, danh mục thuốc, sản phẩm, bài viết, bản đồ chỉ đường

## 5. Tính năng Marketing
- [ ] 5.1 Tạo landing page giới thiệu quầy thuốc
- [ ] 5.2 Phát triển trang hiển thị sản phẩm/dịch vụ
- [ ] 5.3 Bổ sung nội dung/CTA liên hệ phù hợp với yêu cầu landing page

## 6. Tính năng Quản trị
- [ ] 6.1 Tạo dashboard admin
- [ ] 6.2 Phát triển form quản lý sản phẩm
- [ ] 6.3 Tạo form quản lý bài viết/dịch vụ

## 7. Kiểm thử
- [ ] 7.1 Thiết lập Vitest và @testing-library/react
- [ ] 7.2 Viết unit test cho helper và store Zustand
- [ ] 7.3 Thiết lập Playwright cho E2E testing

## 8. Triển khai
- [ ] 8.1 Cấu hình Vercel deployment
- [ ] 8.2 Thiết lập CI/CD pipeline
- [ ] 8.3 Tích hợp Vercel Analytics và ghi nhận Web Vitals/thời gian tải cho yêu cầu Performance Monitoring
