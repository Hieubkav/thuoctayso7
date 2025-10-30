# Bối cảnh Dự án

## Mục đích

- Xây dựng hệ thống marketing số cho Quầy Thuốc Tây số 7 của Dược Sĩ Trong tại đường Nguyễn Phích, thị trấn U Minh, tỉnh Cà Mau.
- Trình bày landing page đầy đủ thông tin về phòng khám, dịch vụ tư vấn, hình ảnh, bảng giá và đường đi để tăng niềm tin khách hàng địa phương.
- Cung cấp bảng quản trị đơn giản để chủ quầy thuốc cập nhật sản phẩm, khuyến mãi, danh mục dịch vụ và bài viết nhanh chóng.
- Hỗ trợ thu thập thống kê lượng truy cập để tối ưu các chiến dịch quảng cáo tại địa phương.

## Công nghệ

| Lớp          | Công nghệ đề xuất                            | Ghi chú                           |
| ------------- | ------------------------------------------------- | ---------------------------------- |
| UI            | Next.js 16, Tailwind CSS, shadcn/ui, lucide-react | Frontend tái sử dụng, tài ứng |
| State         | Zustand                                           | Quản lý state nhẹ cho admin     |
| Form          | React Hook Form + Zod                             | Validation rõ ràng, UX tốt      |
| DB            | Neon Postgres + Drizzle ORM                       | CRUD type-safe, deploy nhanh       |
| Auth          | NextAuth.js                                       | Đăng nhập admin/user linh hoạt |
| Backend       | Route Handlers (API Routes)                       | Serverless, scale tự động       |
| Hosting       | Vercel                                            | CI/CD sẵn có, tối ưu Next.js   |
| Analytics     | Vercel Analytics (free)                           | Theo dõi traffic realtime         |
| Notifications | Sonner / shadcn toast                             | Thông báo UI nhanh gọn          |

## Quy tắc Dự án

### Kiểu mã

- Sử dụng TypeScript strict, bật `noUncheckedIndexedAccess` và `strictNullChecks`.
- ESLint với `next/core-web-vitals` và `@typescript-eslint`, Prettier + plugin Tailwind để sắp xếp class.
- Đặt tên component, hook, store theo PascalCase; biến và hàm theo camelCase; file component React trong `components/` kết thúc `.tsx`.
- Tailwind class ưu tiên util tĩnh, tránh CSS riêng trừ khi cần mở rộng; dùng helper `cn` từ shadcn/ui.
- Schema Drizzle đặt tên bảng snake_case, cột camel_case; giữ chung một file `lib/db/schema.ts`.

### Mô hình Kiến trúc

- Sử dụng app router của Next.js 16, chia thành `app/(marketing)` cho landing page và `app/(admin)` cho khu admin.
- Tách logic domain theo thư mục `features/<tên-module>` gồm UI, hooks, services, test; chia sẻ UI chung trong `components/ui`.
- Lưu trữ config chung (metadata SEO, thông tin phòng khám) trong `lib/config.ts`, sử dụng Server Components để render nội dung marketing tĩnh.
- API serverless trong `app/api/*` gọi tới lớp data `lib/db` (Drizzle) và lớp service `features/*/service.ts`.
- Tối ưu hình ảnh qua Next Image, lưu thông tin ảnh trên storage ngoài (VD: Vercel Blob hoặc Cloudinary) nếu cần.

### Chiến lược Kiểm thử

- Viết unit test cho helper, store Zustand, form resolver bằng Vitest + @testing-library/react.
- Sử dụng Playwright cho E2E với các hành trình: xem landing page, gửi form tư vấn, đăng nhập admin, cập nhật sản phẩm.
- Mock API trong test bằng MSW để giữ ổn định, tích hợp vào CI của Vercel.
- Chạy npm script `test` trước khi merge và mặc định chạy song song.

### Quy trinh Git

- Nhánh chính `main`, tạo nhánh tính năng theo mẫu `feature/<short-desc>`; bugfix dùng `fix/<short-desc>`.
- Áp dụng Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`...) và giữ PR nhỏ hơn 500 dòng diff.
- Mỗi PR bắt buộc lint/test pass, tự review theo checklist trong openspec tasks.md trước khi họp.
- Thuc hien mo ta thay doi theo OpenSpec (proposal -> tasks -> implementation) truoc khi code.

## Bối cảnh Miền

- Phòng khám và quầy thuốc phục vụ người dân khu vực U Minh, cần nhận diện thương hiệu rõ ràng và thông tin tin cậy.
- Landing page cần nhấn mạnh kinh nghiệm Dược Sĩ Trong, hình ảnh quầy thuốc, giờ hoạt động, số hotline, bản đồ chỉ đường.
- Admin dashboard chủ yếu để quản lý nội dung marketing: danh mục thuốc, bài viết tư vấn sức khỏe, thông báo khuyến mãi theo mùa.
- Hỗ trợ người dùng đặt câu hỏi nhanh (form hoặc chat) và tự động gửi thông báo cho admin qua email.

## Ràng buộc Quan trọng

- Ưu tiên tối ưu trên thiết bị di động (phần lớn traffic từ smartphone) và thời gian tải < 2s trên mạng 3G khu vực nông thôn.
- Nội dung y tế phải chính xác, không tự động tư vấn điều trị; phải có khuyến cáo liên hệ trực tiếp Dược Sĩ Trong.
- Giao diện admin phải dễ sử dụng cho người không chuyên CNTT; cần tối đa 3 bước để cập nhật thông tin.
- Dữ liệu khách hàng (đồng ý nhận tư vấn) phải được lưu an toàn, hạn chế chia sẻ ra ngoài.

## Phụ thuộc Bên ngoài

- Neon Postgres (serverless Postgres) cho dữ liệu sản phẩm, bài viết, bản ghi đăng ký tư vấn.
- NextAuth.js với provider Credentials (email + mật khẩu) và tùy chọn OTP qua email sử dụng Resend
- Vercel Analytics cho thống kê truy cập;
- Dùng Sonner hoặc toast của shadcn/ui cho thông báo UI, lucide-react cho icon.
- Tích hợp bản đồ qua iframe Google Maps để chỉ đường tới phòng khám.
