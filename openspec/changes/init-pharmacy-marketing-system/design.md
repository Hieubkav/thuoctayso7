## Bối cảnh

Dự án xây dựng hệ thống marketing số cho Quầy Thuốc Tây số 7 của Dược Sĩ Trong tại U Minh, Cà Mau. Hệ thống cần bao gồm landing page giới thiệu dịch vụ và sản phẩm, cùng với bảng quản trị để cập nhật nội dung. Dự án cần tuân thủ các quy tắc kỹ thuật và kiến trúc được mô tả trong project.md.

## Mục tiêu / Mục tiêu không

### Mục tiêu:
- Xây dựng hệ thống web responsive hoạt động tốt trên thiết bị di động
- Cung cấp giao diện quản trị đơn giản cho người không chuyên CNTT
- Tích hợp hệ thống analytics để theo dõi hiệu quả chiến dịch
- Đảm bảo hiệu suất tải trang nhanh (dưới 2s trên mạng 3G)
- Hỗ trợ quy trình đặt lại mật khẩu an toàn cho admin và bảo vệ dữ liệu đăng nhập

### Mục tiêu không:
- Không xây dựng hệ thống bán hàng online 
- Không tích hợp thanh toán điện tử
- Không xây dựng hệ thống quản lý kho hàng chi tiết

## Quyết định

### Kiến trúc hệ thống:
- Sử dụng Next.js 16 với App Router để tận dụng tính năng server-side rendering và static generation
- Chia cấu trúc thành `app/(marketing)` cho giao diện người dùng và `app/(admin)` cho khu vực quản trị
- Sử dụng Vercel Postgres + Drizzle ORM cho cơ sở dữ liệu để đảm bảo type safety và dễ maintain
- Tách logic theo module trong thư mục `features/<tên-module>` để dễ mở rộng và bảo trì
- Định nghĩa bảng `admin_users` với cột mật khẩu đã băm và bảng/token phục vụ yêu cầu đặt lại mật khẩu

### Công nghệ:
- UI: Next.js 16, Tailwind CSS, shadcn/ui, lucide-react theo khuyến nghị trong project.md
- Quản lý trạng thái: Zustand cho cả client và server state đơn giản
- Xác thực: NextAuth.js với provider Credentials cho admin
- Email: Resend (hoặc dịch vụ SMTP tương đương) để gửi liên kết đặt lại mật khẩu
- Analytics & Performance: Vercel Web Analytics kết hợp thu thập Web Vitals để ghi nhận thời gian tải trang
- Kiểm thử: Vitest cho unit test, Playwright cho E2E test
- Triển khai: Vercel với CI/CD tự động

### Bảo mật và xác thực:
- Mật khẩu admin được băm bằng bcrypt trước khi lưu vào cơ sở dữ liệu và so sánh thông qua adapter NextAuth
- Quy trình đặt lại mật khẩu tạo token dùng một lần có thời hạn, lưu trong bảng `password_reset_tokens`, gửi qua email và đặt lại sau khi xác thực token
- Session NextAuth cấu hình giới hạn thời gian, bắt buộc HTTPS và sử dụng CSRF token mặc định

### Các lựa chọn đã cân nhắc:
1. Sử dụng Prisma vs Drizzle ORM:
   - Lựa chọn: Drizzle ORM vì tính type-safe và hiệu suất tốt hơn trong môi trường serverless
   - Lý do: Tích hợp tốt với Vercel Postgres và cung cấp type safety mạnh mẽ

2. Sử dụng Redux vs Zustand:
   - Lựa chọn: Zustand vì đơn giản, nhẹ và phù hợp với quy mô dự án
   - Lý do: Dễ học và maintain cho team nhỏ, không cần tính năng phức tạp như Redux

3. Sử dụng Tailwind CSS vs CSS modules:
   - Lựa chọn: Tailwind CSS vì tốc độ phát triển nhanh và dễ maintain
   - Lý do: Phù hợp với shadcn/ui và giúp đồng nhất giao diện

## Rủi ro / Đánh đổi

- Rủi ro: Hiệu suất tải trang có thể chậm ở khu vực nông thôn với mạng 3G
  - Biện pháp giảm thiểu: Tối ưu bundle, sử dụng Next Image, preload font, giảm số lượng thư viện không cần thiết

- Rủi ro: Giao diện admin phức tạp cho người không chuyên CNTT
  - Biện pháp giảm thiểu: Thiết kế tối giản, chỉ tối đa 3 bước cho các tác vụ chính, có hướng dẫn sử dụng

- Rủi ro: Bảo mật dữ liệu khách hàng
  - Biện pháp giảm thiểu: Tuân thủ quy định bảo vệ dữ liệu, mã hóa thông tin nhạy cảm, xác thực chặt chẽ
- Rủi ro: Email đặt lại mật khẩu vào spam hoặc gửi thất bại
  - Biện pháp giảm thiểu: Cấu hình SPF/DKIM, logging retry, hiển thị thông báo nếu email không gửi được

## Kế hoạch Di chuyển

1. Thiết lập cấu trúc dự án và cài đặt thư viện cơ bản
2. Thiết lập cơ sở dữ liệu và mô hình dữ liệu
3. Phát triển giao diện landing page
4. Xây dựng hệ thống xác thực, quy trình đặt lại mật khẩu và giao diện admin
5. Triển khai các tính năng chính
6. Viết test, tối ưu hiệu suất và cấu hình thu thập Web Vitals
7. Triển khai lên Vercel và kiểm tra phân tích số liệu

## Câu hỏi Mở

- Có cần tích hợp chatbot hỗ trợ khách hàng không?
- Có cần tích hợp với các nền tảng mạng xã hội để quảng bá?
- Có nên sử dụng service worker để hỗ trợ offline cho khu vực mạng yếu?
