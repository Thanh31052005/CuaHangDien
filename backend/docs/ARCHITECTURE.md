# 🏛️ Architecture & Project Structure

Hệ thống Backend được xây dựng bằng **Java 21** và **Spring Boot 3.x**, tuân thủ nghiêm ngặt mô hình kiến trúc phân lớp (Layered Architecture) kết hợp với các nguyên tắc RESTful API.

---

## 📂 1. Cấu trúc Thư mục (Directory Structure)

Toàn bộ mã nguồn nằm trong package gốc `com.electric_shop.backend`:

```text
src/main/java/com/electric_shop/backend/
├── config/         # Cấu hình hệ thống (Security, CORS, Redis, RabbitMQ...)
├── controller/     # Tầng Giao tiếp (Presentation Layer - REST APIs)
├── dto/            # Data Transfer Objects (Request/Response models)
├── entity/         # Tầng Dữ liệu (Database Models / JPA Entities)
├── enums/          # Tập hợp các hằng số (Status, Role, PaymentMethod...)
├── mapper/         # Các class chuyển đổi Entity <-> DTO (Nếu có)
├── repository/     # Tầng Truy xuất dữ liệu (Data Access Layer - Spring Data JPA)
├── security/       # Xử lý xác thực, phân quyền (JWT Filters, UserDetails)
└── service/        # Tầng Nghiệp vụ (Business Logic Layer)
```

---

## ⚙️ 2. Luồng xử lý dữ liệu (Data Flow)

Một Request từ Frontend/Client sẽ đi qua các lớp sau trước khi trả về kết quả:

1. **Client (React)** gọi API qua HTTP Request.
2. **Security Filter Chain** (`JwtAuthenticationFilter`): Chặn request để kiểm tra token JWT (nếu endpoint yêu cầu bảo mật).
3. **Controller**: Nhận request, thực hiện Validate DTO (sử dụng `@Valid`), và gọi xuống Service.
4. **Service**: Chứa logic nghiệp vụ cốt lõi (tính toán giá, xử lý kho, áp mã giảm giá). Nếu cần dữ liệu, Service sẽ gọi xuống Repository.
5. **Repository**: Giao tiếp với MySQL Database thông qua Hibernate/JPA, truy vấn bảng tương ứng và trả Entity về cho Service.
6. **Controller** (lại): Nhận kết quả từ Service, đóng gói vào DTO hoặc `ResponseEntity`, và trả về chuỗi JSON (kèm HTTP Status 200, 201, 400, 404...) cho Client.

---

## 🛡️ 3. Cơ chế Bảo mật (Security & JWT)

Hệ thống sử dụng **Spring Security** kết hợp với **JSON Web Token (JWT)** theo mô hình Stateless.

- **Đăng ký / Đăng nhập**: Người dùng gọi `/api/auth/register` và `/api/auth/login`. Thành công sẽ được cấp một chuỗi `Bearer Token` (JWT).
- **Lưu trữ Token**: Token được Frontend lưu vào `localStorage` và tự động gắn vào Header `Authorization: Bearer <token>` của mọi API sau đó.
- **Xác thực tự động**: Mỗi request đi vào Backend sẽ đi qua `JwtAuthenticationFilter`. Filter này bóc tách Header, dùng Secret Key (cấu hình trong `application.properties`) để giải mã JWT, lấy ra Username. Nếu hợp lệ, hệ thống sẽ cấp quyền truy cập vào endpoint tương ứng.
- **Phân quyền (Role-based)**: Một số API (như Xoá, Thêm Sản phẩm) yêu cầu quyền ADMIN. Cấu hình phân quyền được quy định cụ thể tại `SecurityConfig.java`.

---

## 🔄 4. Database-First & DDL Auto

Hệ thống đang hoạt động với cấu hình `spring.jpa.hibernate.ddl-auto=validate` (hoặc `update` trong môi trường dev).
Điều này có nghĩa là các Java Entities (`@Entity`) là nguồn chân lý duy nhất (Source of Truth) cho cấu trúc bảng trong MySQL. Bất kỳ thay đổi nào trong Entity sẽ được Spring Data JPA dịch sang câu lệnh SQL DDL để tương tác với Database.

---

## 🚀 5. Mở rộng (Infrastructure - Dành cho tương lai)

Hệ thống đã được chuẩn bị sẵn sàng (dependencies) cho kiến trúc phân tán:
- **Redis**: Phục vụ cho Caching (Lưu tạm danh sách sản phẩm nổi bật, session...).
- **RabbitMQ**: Đóng vai trò Message Broker (Xử lý hàng đợi bất đồng bộ như Gửi email hóa đơn sau khi đặt hàng thành công).
