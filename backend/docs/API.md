# 🌐 RESTful API Documentation

Tài liệu này mô tả chi tiết các endpoint API hiện có trong hệ thống Backend (Spring Boot).
Base URL: `http://localhost:8080/api`

---

## 🔐 1. Authentication (Xác thực) - `AuthController`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Đăng ký tài khoản người dùng mới.<br>**Body:** `{"username": "...", "email": "...", "password": "...", "fullName": "..."}` | ❌ No |
| `POST` | `/api/auth/login` | Đăng nhập và nhận JWT (Bearer Token).<br>**Body:** `{"username": "...", "password": "..."}` | ❌ No |

---

## 🛒 2. Giỏ hàng (Cart) - `CartController`

Các API liên quan đến giỏ hàng yêu cầu Header: `Authorization: Bearer <token>`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/carts` | Lấy thông tin giỏ hàng của user hiện tại. | ✅ Yes |
| `POST` | `/api/carts/add` | Thêm sản phẩm vào giỏ hàng. | ✅ Yes |
| `PUT` | `/api/carts/products/{productId}` | Cập nhật số lượng sản phẩm trong giỏ. | ✅ Yes |
| `DELETE` | `/api/carts/products/{productId}` | Xóa một sản phẩm khỏi giỏ hàng. | ✅ Yes |

---

## 📦 3. Sản phẩm (Product) - `ProductController`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/products` | Lấy danh sách sản phẩm (Hỗ trợ phân trang, lọc theo giá, category, badge). | ❌ No |
| `GET` | `/api/products/{id}` | Lấy thông tin chi tiết một sản phẩm theo ID. | ❌ No |
| `POST` | `/api/products` | Tạo sản phẩm mới (Dành cho Admin). | ✅ Yes (Admin) |
| `PUT` | `/api/products/{id}` | Cập nhật thông tin sản phẩm (Dành cho Admin). | ✅ Yes (Admin) |
| `DELETE` | `/api/products/{id}` | Xóa sản phẩm (Dành cho Admin). | ✅ Yes (Admin) |

---

## 🗂 4. Danh mục (Category) - `CategoryController`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/categories` | Lấy toàn bộ danh mục sản phẩm. | ❌ No |
| `GET` | `/api/categories/{id}` | Lấy chi tiết một danh mục theo ID. | ❌ No |
| `POST` | `/api/categories` | Tạo danh mục mới (Dành cho Admin). | ✅ Yes (Admin) |
| `PUT` | `/api/categories/{id}` | Cập nhật danh mục (Dành cho Admin). | ✅ Yes (Admin) |
| `DELETE` | `/api/categories/{id}` | Xóa danh mục (Dành cho Admin). | ✅ Yes (Admin) |

---

## 🧾 5. Đơn hàng (Order) - `OrderController`

Các API liên quan đến giỏ hàng yêu cầu Header: `Authorization: Bearer <token>`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/orders/checkout` | Thanh toán và tạo đơn hàng từ giỏ hàng. | ✅ Yes |
| `GET` | `/api/orders/history` | Xem lịch sử mua hàng của user. | ✅ Yes |
| `GET` | `/api/orders/{orderId}` | Xem chi tiết một đơn hàng cụ thể. | ✅ Yes |
| `PUT` | `/api/orders/{orderId}/cancel` | Hủy một đơn hàng (Chỉ áp dụng khi đơn ở trạng thái PENDING). | ✅ Yes |

---

## 🎟 6. Khuyến mãi (Promotion) - `PromotionController`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/promotions/apply?code={code}&cartTotal={amount}` | Áp dụng mã giảm giá và tính toán số tiền được giảm. | ❌ No |

---

## ⭐ 7. Đánh giá (Review) - `ReviewController`

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/reviews` | Đăng một đánh giá (review) mới cho sản phẩm. | ✅ Yes |

---
*Lưu ý: Mọi API bị chặn bởi Spring Security (`/api/orders/**`, `/api/carts/**`, v.v.) sẽ trả về mã lỗi `401 Unauthorized` nếu không cung cấp Token hợp lệ.*
