## CÁC YÊU CẦU BỔ SUNG

### Yêu cầu: Luồng thiết lập Admin đầu tiên (First Admin Onboarding Flow)

Hệ thống **PHẢI** hướng dẫn người dùng tạo tài khoản admin đầu tiên trước khi truy cập khu vực quản trị, trong trường hợp chưa có bất kỳ admin nào tồn tại.

#### Kịch bản: Hiển thị trang setup khi chưa có admin

* **CHO TRƯỚC (GIVEN)** người dùng truy cập bất kỳ trang nào trong khu vực admin
* **KHI (WHEN)** hệ thống đếm được **0** tài khoản có vai trò (role) admin
* **THÌ (THEN)** người dùng bị chuyển hướng đến trang `/admin/setup`
* **VÀ (AND)** form hiển thị các trường: Họ tên, Email, Mật khẩu, Nhập lại mật khẩu và ô kiểm (checkbox) đồng ý điều khoản

#### Kịch bản: Tạo tài khoản đầu tiên thành công

* **CHO TRƯỚC (GIVEN)** trang `/admin/setup`
* **KHI (WHEN)** người dùng nhập thông tin hợp lệ và gửi (submit)
* **THÌ (THEN)** hệ thống mã hóa mật khẩu và tạo user với role admin, cờ (flag) *super admin*
* **VÀ (AND)** người dùng được đăng nhập và chuyển sang dashboard admin trong cùng một luồng (flow)

#### Kịch bản: Bảo mật thông tin nhập vào

* **CHO TRƯỚC (GIVEN)** form setup
* **KHI (WHEN)** người dùng nhập mật khẩu không đạt các tiêu chí tối thiểu (chiều dài >= 12, có chữ hoa, chữ thường, số, ký tự đặc biệt)
* **THÌ (THEN)** form thông báo lỗi và không gửi yêu cầu (request) lên server

### Yêu cầu: Khóa trang setup sau khi tạo admin

Hệ thống **PHẢI** khóa trang setup ngay sau khi đã có tài khoản admin đầu tiên để tránh tạo thêm tài khoản trái phép.

#### Kịch bản: Từ chối tạo thêm khi đã có admin

* **CHO TRƯỚC (GIVEN)** đã có ít nhất 1 tài khoản admin tồn tại
* **KHI (WHEN)** người dùng gọi API POST `/api/admin/setup`
* **THÌ (THEN)** server trả về mã lỗi 409 (Conflict) và thông điệp yêu cầu sử dụng luồng khác để tạo tài khoản mới

#### Kịch bản: Truy cập trang setup sau khi đã có admin

* **CHO TRƯỚC (GIVEN)** người dùng cố gắng truy cập vào `/admin/setup`
* **KHI (WHEN)** hệ thống đếm được số lượng admin > 0
* **THÌ (THEN)** người dùng được chuyển hướng về trang đăng nhập thông thường `(/admin/login)`
* **VÀ (AND)** một thông báo giải thích rằng việc setup chỉ thực hiện được một lần
