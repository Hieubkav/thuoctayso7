# Trả lời bằng tiếng việt

# Hướng Dẫn OpenSpec

Hướng dẫn cho các trợ lý lập trình AI sử dụng OpenSpec để phát triển theo phương pháp spec-driven. 

## TL;DR Danh sách Kiểm nhanh

- Tìm kiếm công việc hiện có: `openspec spec list --long`, `openspec list` (chỉ sử dụng `rg` cho tìm kiếm toàn văn bản)
- Quyết định phạm vi: khả năng mới so với sửa đổi khả năng hiện có
- Chọn một `change-id` duy nhất: kebab-case, bắt đầu bằng động từ (`add-`, `update-`, `remove-`, `refactor-`)
- Tạo khung: `proposal.md`, `tasks.md`, `design.md` (chỉ khi cần), và các spec delta theo từng khả năng bị ảnh hưởng
- Viết delta: sử dụng `## ADDED|MODIFIED|REMOVED|RENAMED Requirements`; bao gồm ít nhất một `#### Scenario:` cho mỗi yêu cầu
- Xác thực: `openspec validate [change-id] --strict` và sửa các vấn đề
- Yêu cầu phê duyệt: Không bắt đầu triển khai cho đến khi đề xuất được chấp thuận

## Quy trình Ba Giai đoạn

### Giai đoạn 1: Tạo Thay đổi

Tạo đề xuất khi bạn cần:

- Thêm tính năng hoặc chức năng
- Thực hiện thay đổi phá vỡ (API, schema)
- Thay đổi kiến trúc hoặc mẫu
- Tối ưu hiệu suất (thay đổi hành vi)
- Cập nhật mẫu bảo mật

Các trình kích hoạt (ví dụ):

- "Giúp tôi tạo một đề xuất thay đổi"
- "Giúp tôi lập kế hoạch một thay đổi"
- "Giúp tôi tạo một đề xuất"
- "Tôi muốn tạo một đề xuất spec"
- "Tôi muốn tạo một spec"

Hướng dẫn phù hợp lỏng lẻo:

- Chứa một trong: `proposal`, `change`, `spec`
- Với một trong: `create`, `plan`, `make`, `start`, `help`

Bỏ qua đề xuất cho:

- Sửa lỗi (khôi phục hành vi dự định)
- Sai chính tả, định dạng, chú thích
- Cập nhật phụ thuộc (không phá vỡ)
- Thay đổi cấu hình
- Kiểm thử cho hành vi hiện có

**Quy trình**

1. Xem lại `openspec/project.md`, `openspec list`, và `openspec list --specs` để hiểu bối cảnh hiện tại.
2. Chọn một `change-id` duy nhất bắt đầu bằng động từ và tạo khung `proposal.md`, `tasks.md`, tùy chọn `design.md`, và các spec delta dưới `openspec/changes/<id>/`.
3. Soạn thảo các spec delta sử dụng `## ADDED|MODIFIED|REMOVED Requirements` với ít nhất một `#### Scenario:` cho mỗi yêu cầu.
4. Chạy `openspec validate <id> --strict` và giải quyết bất kỳ vấn đề nào trước khi chia sẻ đề xuất.

### Giai đoạn 2: Triển khai Thay đổi

Theo dõi các bước này dưới dạng TODO và hoàn thành từng bước một.

1. **Đọc proposal.md** - Hiểu những gì đang được xây dựng
2. **Đọc design.md** (nếu tồn tại) - Xem lại các quyết định kỹ thuật
3. **Đọc tasks.md** - Nhận danh sách kiểm tra triển khai
4. **Triển khai các tác vụ theo thứ tự** - Hoàn thành theo thứ tự
5. **Xác nhận hoàn thành** - Đảm bảo mọi mục trong `tasks.md` đã hoàn tất trước khi cập nhật trạng thái
6. **Cập nhật danh sách kiểm tra** - Sau khi tất cả công việc hoàn tất, đặt mọi tác vụ thành `- [x]` để danh sách phản ánh thực tế
7. **Cổng phê duyệt** - Không bắt đầu triển khai cho đến khi đề xuất được xem xét và phê duyệt

### Giai đoạn 3: Lưu trữ Thay đổi

Sau khi triển khai, tạo một PR riêng biệt để:

- Di chuyển `changes/[name]/` → `changes/archive/YYYY-MM-DD-[name]/`
- Cập nhật `specs/` nếu các khả năng thay đổi
- Sử dụng `openspec archive <change-id> --skip-specs --yes` cho các thay đổi chỉ có công cụ (luôn truyền ID thay đổi một cách rõ ràng)
- Chạy `openspec validate --strict` để xác nhận rằng thay đổi đã lưu trữ vượt qua kiểm tra

## Trước Bất kỳ Tác vụ Nào

**Danh sách Kiểm Bối cảnh:**

- [ ] Đọc các spec liên quan trong `specs/[capability]/spec.md`
- [ ] Kiểm tra các thay đổi đang chờ trong `changes/` để tránh xung đột
- [ ] Đọc `openspec/project.md` để biết quy ước
- [ ] Chạy `openspec list` để xem các thay đổi đang hoạt động
- [ ] Chạy `openspec list --specs` để xem các khả năng hiện có

**Trước Khi Tạo Spec:**

- Luôn kiểm tra xem khả năng đã tồn tại chưa
- Ưu tiên sửa đổi các spec hiện có hơn tạo bản sao
- Sử dụng `openspec show [spec]` để xem lại trạng thái hiện tại
- Nếu yêu cầu mơ hồ, hãy đặt 1–2 câu hỏi làm rõ trước khi tạo khung

### Hướng dẫn Tìm kiếm

- Liệt kê các spec: `openspec spec list --long` (hoặc `--json` cho script)
- Liệt kê các thay đổi: `openspec list` (hoặc `openspec change list --json` - đã lỗi thời nhưng vẫn khả dụng)
- Hiển thị chi tiết:
  - Spec: `openspec show <spec-id> --type spec` (sử dụng `--json` cho bộ lọc)
  - Thay đổi: `openspec show <change-id> --json --deltas-only`
- Tìm kiếm toàn văn bản (sử dụng ripgrep): `rg -n "Requirement:|Scenario:" openspec/specs`

## Bắt đầu Nhanh

### Lệnh CLI

```bash
# Các lệnh thiết yếu
openspec list                  # Liệt kê các thay đổi đang hoạt động
openspec list --specs          # Liệt kê các đặc tả
openspec show [item]           # Hiển thị thay đổi hoặc đặc tả
openspec validate [item]       # Xác thực các thay đổi hoặc đặc tả
openspec archive <change-id> [--yes|-y]   # Lưu trữ sau khi triển khai (thêm --yes cho các lần chạy không tương tác)

# Quản lý dự án
openspec init [path]           # Khởi tạo OpenSpec
openspec update [path]         # Cập nhật các tệp hướng dẫn

# Chế độ tương tác
openspec show                  # Mời lựa chọn
openspec validate              # Chế độ xác thực hàng loạt

# Gỡ lỗi
openspec show [change] --json --deltas-only
openspec validate [change] --strict
```

### Cờ lệnh

- `--json` - Đầu ra có thể đọc được bởi máy tính
- `--type change|spec` - Phân biệt các mục
- `--strict` - Xác thực toàn diện
- `--no-interactive` - Vô hiệu hóa lời nhắc
- `--skip-specs` - Lưu trữ mà không cập nhật spec
- `--yes`/`-y` - Bỏ qua lời nhắc xác nhận (lưu trữ không tương tác)

## Cấu trúc Thư mục

```
openspec/
├── project.md              # Quy tắc dự án
├── specs/                  # Sự thật hiện tại - những gì ĐÃ xây dựng
│   └── [capability]/       # Khả năng tập trung duy nhất
│       ├── spec.md         # Yêu cầu và kịch bản
│       └── design.md       # Mô hình kỹ thuật
├── changes/                # Đề xuất - những gì NÊN thay đổi
│   ├── [change-name]/
│   │   ├── proposal.md     # Lý do, cái gì, tác động
│   │   ├── tasks.md        # Danh sách kiểm tra triển khai
│   │   ├── design.md       # Quyết định kỹ thuật (tùy chọn; xem tiêu chí)
│   │   └── specs/          # Thay đổi delta
│   │       └── [capability]/
│   │           └── spec.md # ADDED/MODIFIED/REMOVED
│   └── archive/            # Các thay đổi đã hoàn thành
```

## Tạo Đề xuất Thay đổi

### Cây Quyết định

```
Yêu cầu mới?
├─ Sửa lỗi khôi phục hành vi spec? → Sửa trực tiếp
├─ Sai chính tả/định dạng/chú thích? → Sửa trực tiếp  
├─ Tính năng/khả năng mới? → Tạo đề xuất
├─ Thay đổi phá vỡ? → Tạo đề xuất
├─ Thay đổi kiến trúc? → Tạo đề xuất
└─ Không rõ? → Tạo đề xuất (an toàn hơn)
```

### Cấu trúc Đề xuất

1. **Tạo thư mục:** `changes/[change-id]/` (kebab-case, bắt đầu bằng động từ, duy nhất)
2. **Viết proposal.md:**

```markdown
## Lý do
[1-2 câu về vấn đề/cơ hội]

## Những gì Thay đổi
- [Danh sách các thay đổi]
- [Ghi rõ các thay đổi phá vỡ bằng **BREAKING**]

## Tác động
- Các spec bị ảnh hưởng: [liệt kê các khả năng]
- Mã bị ảnh hưởng: [các tệp/hệ thống chính]
```

3. **Tạo các spec delta:** `specs/[capability]/spec.md`

```markdown
## ADDED Requirements
### Requirement: Tính năng mới
Hệ thống PHẢI cung cấp...

#### Scenario: Trường hợp thành công
- **WHEN** người dùng thực hiện hành động
- **THEN** kết quả dự kiến

## MODIFIED Requirements
### Requirement: Tính năng hiện có
[Yêu cầu đã sửa đổi đầy đủ]

## REMOVED Requirements
### Requirement: Tính năng cũ
**Lý do**: [Tại sao loại bỏ]
**Di chuyển**: [Cách xử lý]
```

Nếu nhiều khả năng bị ảnh hưởng, tạo nhiều tệp delta dưới `changes/[change-id]/specs/<capability>/spec.md`—một tệp cho mỗi khả năng.

4. **Tạo tasks.md:**

```markdown
## 1. Triển khai
- [ ] 1.1 Tạo lược đồ cơ sở dữ liệu
- [ ] 1.2 Triển khai điểm cuối API
- [ ] 1.3 Thêm thành phần giao diện
- [ ] 1.4 Viết kiểm thử
```

5. **Tạo design.md khi cần thiết:**
   Tạo `design.md` nếu một trong các điều sau áp dụng; nếu không thì bỏ qua:

- Thay đổi cắt ngang (nhiều dịch vụ/mô-đun) hoặc một mẫu kiến trúc mới
- Phụ thuộc bên ngoài mới hoặc thay đổi đáng kể mô hình dữ liệu
- Độ phức tạp về bảo mật, hiệu suất hoặc di chuyển
- Sự mơ hồ mang lại lợi ích từ các quyết định kỹ thuật trước khi lập trình

Khung `design.md` tối thiểu:

```markdown
## Bối cảnh
[Bối cảnh, ràng buộc, các bên liên quan]

## Mục tiêu / Mục tiêu không
- Mục tiêu: [...]
- Mục tiêu không: [...]

## Quyết định
- Quyết định: [Cái gì và tại sao]
- Các lựa chọn đã cân nhắc: [Tùy chọn + lý do]

## Rủi ro / Đánh đổi
- [Rủi ro] → Biện pháp giảm thiểu

## Kế hoạch Di chuyển
[Các bước, hoàn tác]

## Câu hỏi Mở
- [...]
```

## Spec File Format

### Critical: Scenario Formatting

**CORRECT** (use #### headers):

```markdown
#### Scenario: User login success
- **WHEN** valid credentials provided
- **THEN** return JWT token
```

**WRONG** (don't use bullets or bold):

```markdown
- **Scenario: User login**  ❌
**Scenario**: User login     ❌
### Scenario: User login      ❌
```

Every requirement MUST have at least one scenario.

### Requirement Wording

- Use SHALL/MUST for normative requirements (avoid should/may unless intentionally non-normative)

### Delta Operations

- `## ADDED Requirements` - New capabilities
- `## MODIFIED Requirements` - Changed behavior
- `## REMOVED Requirements` - Deprecated features
- `## RENAMED Requirements` - Name changes

Headers matched with `trim(header)` - whitespace ignored.

#### When to use ADDED vs MODIFIED

- ADDED: Introduces a new capability or sub-capability that can stand alone as a requirement. Prefer ADDED when the change is orthogonal (e.g., adding "Slash Command Configuration") rather than altering the semantics of an existing requirement.
- MODIFIED: Changes the behavior, scope, or acceptance criteria of an existing requirement. Always paste the full, updated requirement content (header + all scenarios). The archiver will replace the entire requirement with what you provide here; partial deltas will drop previous details.
- RENAMED: Use when only the name changes. If you also change behavior, use RENAMED (name) plus MODIFIED (content) referencing the new name.

Common pitfall: Using MODIFIED to add a new concern without including the previous text. This causes loss of detail at archive time. If you aren’t explicitly changing the existing requirement, add a new requirement under ADDED instead.

Authoring a MODIFIED requirement correctly:

1) Locate the existing requirement in `openspec/specs/<capability>/spec.md`.
2) Copy the entire requirement block (from `### Requirement: ...` through its scenarios).
3) Paste it under `## MODIFIED Requirements` and edit to reflect the new behavior.
4) Ensure the header text matches exactly (whitespace-insensitive) and keep at least one `#### Scenario:`.

Example for RENAMED:

```markdown
## RENAMED Requirements
- FROM: `### Requirement: Login`
- TO: `### Requirement: User Authentication`
```

## Khắc phục Sự cố

### Lỗi Phổ biến

**"Thay đổi phải có ít nhất một delta"**

- Kiểm tra `changes/[name]/specs/` tồn tại với các tệp .md
- Xác minh các tệp có tiền tố hoạt động (## ADDED Requirements)

**"Yêu cầu phải có ít nhất một kịch bản"**

- Kiểm tra các kịch bản sử dụng định dạng `#### Scenario:` (4 dấu thăng)
- Không sử dụng các điểm đầu dòng hoặc in đậm cho tiêu đề kịch bản

**Lỗi phân tích kịch bản im lặng**

- Định dạng chính xác được yêu cầu: `#### Scenario: Tên`
- Gỡ lỗi với: `openspec show [change] --json --deltas-only`

### Mẹo Xác thực

```bash
# Luôn sử dụng chế độ nghiêm ngặt cho kiểm tra toàn diện
openspec validate [change] --strict

# Gỡ lỗi phân tích delta
openspec show [change] --json | jq '.deltas'

# Kiểm tra yêu cầu cụ thể
openspec show [spec] --json -r 1
```

## Kịch bản Thành công

```bash
# 1) Khám phá trạng thái hiện tại
openspec spec list --long
openspec list
# Tìm kiếm toàn văn bản tùy chọn:
# rg -n "Requirement:|Scenario:" openspec/specs
# rg -n "^#|Requirement:" openspec/changes

# 2) Chọn ID thay đổi và tạo khung
CHANGE=add-two-factor-auth
mkdir -p openspec/changes/$CHANGE/{specs/auth}
printf "## Why\n...\n\n## What Changes\n- ...\n\n## Impact\n- ...\n" > openspec/changes/$CHANGE/proposal.md
printf "## 1. Implementation\n- [ ] 1.1 ...\n" > openspec/changes/$CHANGE/tasks.md

# 3) Thêm delta (ví dụ)
cat > openspec/changes/$CHANGE/specs/auth/spec.md << 'EOF'
## ADDED Requirements
### Requirement: Two-Factor Authentication
Users MUST provide a second factor during login.

#### Scenario: OTP required
- **WHEN** valid credentials are provided
- **THEN** an OTP challenge is required
EOF

# 4) Xác thực
openspec validate $CHANGE --strict
```

## Ví dụ Đa Khả năng

```
openspec/changes/add-2fa-notify/
├── proposal.md
├── tasks.md
└── specs/
    ├── auth/
    │   └── spec.md   # ADDED: Two-Factor Authentication
    └── notifications/
        └── spec.md   # ADDED: OTP email notification
```

auth/spec.md

```markdown
## ADDED Requirements
### Requirement: Two-Factor Authentication
...
```

notifications/spec.md

```markdown
## ADDED Requirements
### Requirement: OTP Email Notification
...
```

## Thực hành Tốt nhất

### Đơn giản Trước tiên

- Mặc định là <100 dòng mã mới
- Triển khai một tệp duy nhất cho đến khi được chứng minh là không đủ
- Tránh các khung công tác mà không có lý do rõ ràng
- Chọn các mẫu đơn giản, đã được chứng minh

### Triggers Độ Phức tạp

Chỉ thêm độ phức tạp với:

- Dữ liệu hiệu suất cho thấy giải pháp hiện tại quá chậm
- Yêu cầu quy mô cụ thể (>1000 người dùng, >100MB dữ liệu)
- Nhiều trường hợp sử dụng được chứng minh yêu cầu trừu tượng hóa

### Tham chiếu Rõ ràng

- Sử dụng định dạng `file.ts:42` cho các vị trí mã
- Tham chiếu các spec là `specs/auth/spec.md`
- Liên kết các thay đổi và PR liên quan

### Đặt tên Khả năng

- Sử dụng động từ-danh từ: `user-auth`, `payment-capture`
- Mục đích duy nhất cho mỗi khả năng
- Quy tắc hiểu trong 10 phút
- Chia nhỏ nếu mô tả cần "VÀ"

### Đặt tên ID Thay đổi

- Sử dụng kebab-case, ngắn gọn và mô tả: `add-two-factor-auth`
- Ưu tiên tiền tố bắt đầu bằng động từ: `add-`, `update-`, `remove-`, `refactor-`
- Đảm bảo tính duy nhất; nếu đã có, thêm `-2`, `-3`, v.v.

## Hướng dẫn Chọn Công cụ

| Nhiệm vụ                      | Công cụ | Tại sao                               |
| ------------------------------- | --------- | -------------------------------------- |
| Tìm tệp theo mẫu             | Glob      | Phù hợp mẫu nhanh                   |
| Tìm kiếm nội dung mã        | Grep      | Tìm kiếm regex đã được tối ưu |
| Đọc các tệp cụ thể        | Read      | Truy cập tệp trực tiếp             |
| Khám phá phạm vi chưa biết | Task      | Điều tra nhiều bước               |

## Phục hồi Lỗi

### Xung đột Thay đổi

1. Chạy `openspec list` để xem các thay đổi đang hoạt động
2. Kiểm tra các spec trùng lặp
3. Phối hợp với các chủ sở hữu thay đổi
4. Cân nhắc kết hợp các đề xuất

### Thất bại Xác thực

1. Chạy với cờ `--strict`
2. Kiểm tra đầu ra JSON để biết chi tiết
3. Xác minh định dạng tệp spec
4. Đảm bảo các kịch bản được định dạng đúng

### Thiếu Bối cảnh

1. Đọc project.md trước
2. Kiểm tra các spec liên quan
3. Xem lại các lưu trữ gần đây
4. Xin làm rõ

## Tham chiếu Nhanh

### Chỉ báo Giai đoạn

- `changes/` - Đã đề xuất, chưa được xây dựng
- `specs/` - Được xây dựng và triển khai
- `archive/` - Các thay đổi đã hoàn thành

### Mục đích Tệp

- `proposal.md` - Lý do và cái gì
- `tasks.md` - Các bước triển khai
- `design.md` - Quyết định kỹ thuật
- `spec.md` - Yêu cầu và hành vi

### Thiết yếu CLI

```bash
openspec list              # Điều gì đang diễn ra?
openspec show [item]       # Xem chi tiết
openspec validate --strict # Nó có đúng không?
openspec archive <change-id> [--yes|-y]  # Đánh dấu hoàn thành (thêm --yes cho tự động hóa)
```

Ghi nhớ: Spec là sự thật. Thay đổi là đề xuất. Giữ cho chúng đồng bộ.
