# Hệ thống Marketing Quầy Thuốc Tây số 7

Dự án Next.js 16 phục vụ việc giới thiệu quầy thuốc của Dược sĩ Trọng (U Minh, Cà Mau). Ứng dụng cung cấp landing page tối ưu cho di động, bảng điều khiển quản trị để cập nhật nội dung, cùng hạ tầng phân tích hiệu năng và CI/CD.

## Tính năng chính

- **Marketing site**: Hero, dịch vụ, sản phẩm, bài viết, bản đồ chỉ đường, speed dial hỗ trợ nhanh.
- **Landing page chuyên biệt**: Nội dung chuyên sâu, tái sử dụng các section marketing.
- **Quản trị**: Đăng nhập NextAuth (Credentials), quản lý sản phẩm, dịch vụ, bài viết với CRUD qua Drizzle ORM.
- **Khả năng đặt lại mật khẩu**: Flow yêu cầu & đặt lại mật khẩu qua email (Resend).
- **Theo dõi hiệu suất**: Tích hợp `@vercel/analytics` và `@vercel/speed-insights`.
- **Kiểm thử & CI**: Vitest cho unit tests, Playwright cấu hình sẵn cho E2E, Github Actions chạy lint/test.

## Công nghệ

- Next.js 16 App Router, React 19
- Tailwind CSS, shadcn/ui, lucide-react
- Zustand, React Hook Form, Zod
- Drizzle ORM + Neon Postgres
- NextAuth.js 5 (Credentials provider)
- Bun package manager

## Cấu trúc thư mục nổi bật

```
app/
  (marketing)/        // Trang marketing & landing
  (admin)/            // Khu vực đăng nhập + dashboard quản trị
  api/                // API routes (NextAuth, CRUD, password reset)
components/ui/        // Các thành phần UI tái sử dụng (shadcn)
features/             // Module theo miền (auth, marketing, admin)
lib/                  // Config, helpers, schema, env
tests/                // Vitest & Playwright
```

## Lệnh hữu ích

```bash
bun install          # Cài đặt phụ thuộc
bun run dev          # Khởi động môi trường phát triển
bun run lint         # Kiểm tra ESLint
bun run test         # Chạy unit tests Vitest
bun run build        # Build Next.js cho production
bun run test:e2e     # (Cần server chạy) chạy Playwright E2E
```

## CI/CD và Triển khai

- `vercel.json` cấu hình build bằng Bun (`bun run build`).
- Workflow `.github/workflows/ci.yml` chạy lint và unit test trên mỗi PR/push vào `main`.
- Deploy đề xuất: Vercel (Next.js 16, analytics tích hợp).

## Chú ý môi trường

Thiết lập các biến môi trường cần thiết (ví dụ `DATABASE_URL`, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`) trước khi chạy build/serve production.
