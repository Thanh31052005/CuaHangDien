# 🗄️ Database Schema & Entities

Tài liệu này mô tả kiến trúc cơ sở dữ liệu (Database Schema) được sử dụng trong hệ thống `electric_shop`, được ánh xạ trực tiếp bằng Hibernate / Spring Data JPA.

Hệ thống sử dụng cơ sở dữ liệu quan hệ **MySQL 8.0**.

---

## 🏗️ Các Bảng (Tables) & Thực thể (Entities)

### 1. 👤 `users` (Người dùng)
Lưu trữ thông tin khách hàng và tài khoản đăng nhập.
- `id` (PK, Long)
- `name` (String): Tên hiển thị
- `email` (String, Unique): Email đăng nhập
- `password` (String): Mật khẩu đã băm (Bcrypt)
- `phone` (String): Số điện thoại
- `address` (String): Địa chỉ giao hàng mặc định
- `role` (Enum): Quyền hệ thống (`USER`, `ADMIN`)
- `created_at`, `updated_at`: Timestamps.

### 2. 🗂️ `categories` (Danh mục sản phẩm)
Phân loại các mặt hàng điện.
- `id` (PK, Long)
- `name` (String): Tên danh mục (Ví dụ: Đèn, Quạt, Pin...)
- `description` (String): Mô tả danh mục
- *Quan hệ:* `1-N` với `Product`.

### 3. 🔌 `products` (Sản phẩm)
Lưu trữ thông tin chi tiết từng vật tư, thiết bị điện.
- `id` (PK, Long)
- `name` (String): Tên sản phẩm
- `description` (Text): Mô tả chi tiết
- `price` (BigDecimal): Giá bán hiện tại
- `old_price` (BigDecimal): Giá gốc (nếu có giảm giá)
- `stock` (Integer): Số lượng tồn kho
- `image` (String): URL hình ảnh sản phẩm
- `badge` (String): Nhãn dán (ví dụ: `hot`, `new`, `sale`)
- `category_id` (FK): Tham chiếu đến `categories`.
- *Quan hệ:* `1-N` với `Review`, `1-N` với `CartItem`, `1-N` với `OrderItem`.

### 4. 🛒 `carts` (Giỏ hàng)
Lưu trữ phiên giỏ hàng của từng User.
- `id` (PK, Long)
- `user_id` (FK): Chủ sở hữu giỏ hàng (Mỗi User có 1 Cart `1-1`).
- *Quan hệ:* `1-N` với `CartItem`.

### 5. 🛍️ `cart_items` (Chi tiết giỏ hàng)
- `id` (PK, Long)
- `cart_id` (FK): Tham chiếu đến `carts`.
- `product_id` (FK): Tham chiếu đến `products`.
- `quantity` (Integer): Số lượng chọn mua.

### 6. 📦 `orders` (Đơn hàng)
Lưu trữ thông tin giao dịch mua hàng.
- `id` (PK, Long)
- `user_id` (FK): Người đặt hàng.
- `total_amount` (BigDecimal): Tổng tiền đơn hàng.
- `status` (Enum): Trạng thái (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- `shipping_address` (String): Địa chỉ giao hàng cụ thể cho đơn này.
- `phone` (String): Số điện thoại nhận hàng.
- `notes` (String): Ghi chú của khách hàng.
- `order_date` (Timestamp): Thời gian đặt hàng.
- *Quan hệ:* `1-N` với `OrderItem`, `1-1` với `Payment`.

### 7. 🏷️ `order_items` (Chi tiết đơn hàng)
- `id` (PK, Long)
- `order_id` (FK): Tham chiếu đến `orders`.
- `product_id` (FK): Tham chiếu đến `products`.
- `quantity` (Integer): Số lượng mua.
- `price` (BigDecimal): Giá chốt tại thời điểm đặt (tránh việc sản phẩm đổi giá sau này).

### 8. 💳 `payments` (Thanh toán)
- `id` (PK, Long)
- `order_id` (FK): Thuộc về đơn hàng nào.
- `amount` (BigDecimal): Số tiền thanh toán.
- `payment_method` (Enum): Phương thức (`COD`, `CREDIT_CARD`, `BANK_TRANSFER`).
- `payment_status` (Enum): Trạng thái (`PENDING`, `COMPLETED`, `FAILED`).
- `payment_date` (Timestamp): Thời gian thanh toán.

### 9. 🎟️ `promotions` (Khuyến mãi)
Lưu trữ thông tin các mã giảm giá.
- `id` (PK, Long)
- `code` (String, Unique): Mã code nhập vào (vd: `SUMMER20`).
- `description` (String): Mô tả.
- `discount_type` (Enum): Loại giảm giá (`PERCENTAGE` - %, `FIXED_AMOUNT` - VNĐ).
- `discount_value` (BigDecimal): Giá trị giảm.
- `min_order_amount` (BigDecimal): Giá trị đơn hàng tối thiểu để áp dụng.
- `start_date`, `end_date`: Thời hạn có hiệu lực.
- `is_active` (Boolean): Trạng thái tắt/mở mã.

### 10. ⭐ `reviews` (Đánh giá)
Lưu đánh giá của khách hàng về một sản phẩm.
- `id` (PK, Long)
- `user_id` (FK): Người đánh giá.
- `product_id` (FK): Sản phẩm bị đánh giá.
- `rating` (Integer): Điểm số (1-5 sao).
- `comment` (Text): Lời nhận xét.
- `created_at` (Timestamp).

---

## 🔗 Sơ đồ Quan hệ (Entity Relationship Diagram)

* `User` (1) ---- (1) `Cart` ---- (N) `CartItem` (N) ---- (1) `Product`
* `User` (1) ---- (N) `Order` ---- (N) `OrderItem` (N) ---- (1) `Product`
* `Order` (1) ---- (1) `Payment`
* `Category` (1) ---- (N) `Product`
* `User` (1) ---- (N) `Review` (N) ---- (1) `Product`
