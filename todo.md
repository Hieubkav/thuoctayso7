I) Triển khai giao diện web đầy đủ

1. Trang chủ

* Thu thập nội dung hero (USP, CTA), dịch vụ nổi bật, testimonial, bản đồ.
* Thiết kế bố cục mobile-first, tối ưu Core Web Vitals và SEO metadata.
* Kết nối dữ liệu động từ cấu hình/admin để cập nhật linh hoạt.

1. Trang sản phẩm & bộ lọc (**/products**, **/products?category=...**)

* Xây lưới sản phẩm với ảnh, giá, mô tả ngắn và badge khuyến mãi.
* Tạo bộ lọc theo danh mục, tình trạng, giá; xử lý query param server-side.
* Thêm phân trang/infinite scroll và breadcrumbs chuẩn SEO.

1. Trang bài viết & bộ lọc (**/posts**, **/posts?tag=...**)

* Hiển thị list bài viết dạng card với tác giả, ngày đăng, thẻ từ khóa.
* Tạo trang chi tiết tối ưu SEO (schema Article, mục lục, ảnh có alt).
* Bổ sung liên quan bài viết, CTA đăng ký tư vấn.

1. Trang chi tiết đơn (liên hệ/đăng ký tư vấn)

* Form khá đầy đủ (họ tên, số điện thoại, nhu cầu, tùy chọn lịch hẹn).
* Dùng React Hook Form + Zod, honeypot chống spam, thông báo Sonner.
* Tích hợp gửi email qua Resend và lưu lead vào DB.

1. Trang landing **/landing** cho chiến dịch

* Tập trung thông điệp CTA, offer khuyến mãi, đếm ngược nếu có.
* Cho phép cấu hình nội dung từ admin để tái sử dụng.
* Thiết lập tracking sự kiện (click CTA, gửi form) qua Vercel Analytics.

II) Xây dựng trang quản trị phù hợp

1. Xác thực & cấu hình chung

* NextAuth credentials + tùy chọn OTP email; middleware bảo vệ **/admin**.
* Module cấu hình thương hiệu (logo, palette màu, typography, metadata SEO chung).
* Thư viện theme áp dụng realtime, sync xuống marketing site.

1. Quản lý sản phẩm

* CRUD sản phẩm (tên, mô tả dài/ngắn, giá, tồn kho, hình, danh mục).
* Upload ảnh (Vercel Blob/Cloudinary) + crop/alt text.
* Bộ lọc, tìm kiếm, import/export CSV đơn giản.

1. Quản lý bài viết

* Editor MDX/WYSIWYG nhẹ, lưu nháp, lịch đăng, gắn tag.
* Preview trực tiếp, kiểm tra SEO (length meta, heading).
* Workflow trạng thái (draft, scheduled, published).

1. Quản lý landing & khuyến mãi

* Form cấu hình hero, lợi ích, CTA, countdown, testimonial chiến dịch.
* Quản lý danh sách khuyến mãi, thời hạn; push lên trang landing/sản phẩm.

1. Quản lý lead & thông báo

* Bảng lead với trạng thái (mới, đang xử lý, đã liên hệ).
* Ghi chú nội bộ, gán trách nhiệm, lọc theo nguồn (landing, form chung).
* Cấu hình email nhận thông báo, bật/tắt OTP.

1. Dashboard thống kê

* Tích hợp dữ liệu Vercel Analytics: traffic, nguồn, conversion form.
* Biểu đồ lead theo thời gian, top sản phẩm được quan tâm.
* Export báo cáo PDF/CSV hàng tháng.

III) Thiết kế cơ sở dữ liệu phục vụ UI

1. Sản phẩm & danh mục

* Bảng **products**: id, name, slug, short_desc, full_desc, price, status, stock, media_id.
* Bảng **categories**: id, name, slug, description; bảng nối **product_categories**.
* Bảng **promotions**: id, title, description, start_at, end_at, discount_type/value.

1. Nội dung marketing

* Bảng **posts**: id, title, slug, summary, content_md, published_at, status, cover_media_id.
* Bảng **tags** + **post_tags** cho bộ lọc; thêm trường SEO (meta_title, meta_desc).
* Bảng **landing_sections**: key, content_json, order để dựng landing linh hoạt.

1. Cấu hình thương hiệu & giao diện

* Bảng **site_settings**: key, value_json (brand colors, typography, contact info, social).
* Bảng **seo_settings**: default metadata, sitemap toggle, canonical links.

1. Lead & thông tin liên hệ

* Bảng **leads**: id, name, phone, email, message, source, status, note, created_at.
* Bảng **lead_events**: lead_id, type (email_sent, status_change), payload_json, created_at.

1. Tài khoản & bảo mật

* Bảng **users**: id, email, hashed_password, role, otp_enabled.
* Bảng **otp_tokens**: user_id, token_hash, expires_at (nếu bật OTP).
* Logging bảo mật: bảng **auth_logs** (user_id, action, ip, user_agent, timestamp).

1. Media & cấu hình phụ trợ

* Bảng **media_assets**: id, url, alt_text, width, height, type, uploaded_by.
* Bảng **config_versions**: key, snapshot_json, created_at để rollback nhanh.
* View hoặc materialized view cho thống kê (ví dụ **product_lead_stats**).
