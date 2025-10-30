## Lý do

Hiện tại, giao diện trang chủ của Quầy Thuốc Tây số 7 sử dụng các placeholder hình ảnh thay vì hình ảnh thực tế của quầy thuốc. Việc sử dụng hình ảnh thực tế sẽ tăng tính xác thực và niềm tin cho khách hàng khi truy cập website. Cần thêm ảnh từ thư mục `public/asset_quaythuoc` làm fallback cho các thành phần như Hero Section và About Section.

## Những gì Thay đổi

- Thêm hình ảnh thực tế của quầy thuốc làm fallback cho các component marketing
- Cập nhật cấu hình fallback để sử dụng hình ảnh từ `public/asset_quaythuoc`
- Ảnh sẽ được sử dụng trong các component như Hero Section và About Section

## Tác động

- Các spec bị ảnh hưởng: marketing
- Mã bị ảnh hưởng: 
  - `features/marketing/data/fallback.ts`
  - `features/marketing/components/hero-section.tsx`
  - `features/marketing/components/about-section.tsx`
  - `lib/config.ts` (nếu cần thêm cấu hình hình ảnh)