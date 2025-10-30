## Why

Cần khởi tạo dự án hệ thống marketing số cho Quầy Thuốc Tây số 7 của Dược Sĩ Trong để:

- Thiết lập nền tảng kỹ thuật số phục vụ người dân khu vực U Minh, Cà Mau
- Tạo landing page chuyên nghiệp giới thiệu dịch vụ và sản phẩm
- Xây dựng bảng quản trị đơn giản cho việc cập nhật nội dung
- Thiết lập hệ thống analytics để theo dõi hiệu quả chiến dịch

## What Changes

Tạo dự án Next.js hoàn chỉnh với:

- Cấu trúc thư mục theo kiến trúc được quy định trong project.md
- Cài đặt các thư viện cần thiết (Next.js 16, Tailwind CSS, shadcn/ui, lucide-react, v.v.)
- Thiết lập hệ thống quản lý trạng thái (Zustand)
- Cài đặt hệ thống xác thực (NextAuth.js)
- Thiết lập cơ sở dữ liệu (Neon Postgres + Drizzle ORM)
- Thiết lập hệ thống kiểm thử (Vitest, Playwright)
- Cấu hình ESLint, Prettier theo quy tắc dự án

**BREAKING**: Đây là lần khởi tạo đầu tiên của hệ thống, không có breaking changes với hệ thống hiện tại (vì đây là dự án mới).

## Impact

- Specs bị ảnh hưởng: Tất cả các specs sẽ được tạo mới cho hệ thống
- Mã bị ảnh hưởng: Tất cả các tệp sẽ được tạo mới trong dự án
- Hệ thống: Dự án sẽ được deploy trên Vercel theo mô hình serverless
