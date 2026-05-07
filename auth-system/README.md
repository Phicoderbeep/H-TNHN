# Hệ thống Xác thực - Authentication System

Hệ thống xác thực đầy đủ gồm frontend (React + TypeScript) và backend (Express + PostgreSQL) với JWT, bcrypt, và bảo mật toàn diện.

## Kiến trúc

```
auth-system/
├── backend/                 # API Server (Express + TypeScript)
│   ├── src/
│   │   ├── config/         # Cấu hình environment, database
│   │   ├── routes/         # Định tuyến API
│   │   ├── controllers/    # Xử lý request
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Validation schemas (Zod)
│   ├── prisma/             # Database schema & migrations
│   └── tests/              # Unit & integration tests
├── frontend/               # SPA (React + TypeScript + Vite)
│   └── src/
│       ├── components/     # UI components
│       ├── context/        # Auth context provider
│       ├── services/       # API client
│       ├── types/          # TypeScript types
│       └── styles/         # Global CSS
└── README.md
```

## Yêu cầu hệ thống

- Node.js >= 18
- PostgreSQL >= 14
- npm hoặc yarn

## Cài đặt & Chạy

### 1. Backend

```bash
cd auth-system/backend

# Copy file môi trường
cp .env.example .env

# Cài đặt dependencies
npm install

# Tạo database và chạy migrations
npx prisma db push

# Seed dữ liệu mẫu
npm run prisma:seed

# Chạy server development
npm run dev
```

Server chạy tại `http://localhost:4000`

### 2. Frontend

```bash
cd auth-system/frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend chạy tại `http://localhost:5173`

### 3. Chạy cả hai cùng lúc (từ thư mục gốc)

```bash
# Terminal 1 - Backend
cd auth-system/backend && npm run dev

# Terminal 2 - Frontend
cd auth-system/frontend && npm run dev
```

## Biến môi trường

### Backend (.env)

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `NODE_ENV` | Môi trường | `development` |
| `PORT` | Cổng server | `4000` |
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL | - |
| `JWT_SECRET` | Khóa bí mật JWT | - |
| `JWT_EXPIRES_IN` | Thời hạn access token | `15m` |
| `JWT_REFRESH_SECRET` | Khóa bí mật refresh token | - |
| `JWT_REFRESH_EXPIRES_IN` | Thời hạn refresh token | `7d` |
| `BCRYPT_ROUNDS` | Số vòng mã hóa bcrypt | `12` |
| `FRONTEND_URL` | URL frontend cho CORS | `http://localhost:5173` |

## Tài khoản mẫu

Sau khi seed:

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| Học sinh | `hocsinh@example.com` | `password123` |
| Giáo viên | `giaovien@example.com` | `password123` |

## API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/auth/register` | Đăng ký | Không |
| POST | `/api/auth/login` | Đăng nhập | Không |
| POST | `/api/auth/refresh` | Làm mới token | Không |
| POST | `/api/auth/logout` | Đăng xuất | Có |
| GET | `/api/auth/me` | Thông tin user | Có |
| GET | `/api/health` | Kiểm tra API | Không |

### Ví dụ Register

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "test@example.com",
    "password": "password123",
    "role": "STUDENT"
  }'
```

### Ví dụ Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hocsinh@example.com",
    "password": "password123"
  }'
```

## Kiểm thử

```bash
cd auth-system/backend
npm test
```

## Test thủ công với Postman/Insomnia

1. Import file `backend/openapi.yaml` vào Postman/Insomnia
2. Tạo request POST tới `/api/auth/register` với body JSON
3. Đăng nhập và copy `accessToken` từ response
4. Thêm header `Authorization: Bearer <token>` cho các request bảo vệ

## Bảo mật

- **Mã hóa mật khẩu**: bcrypt với 12 rounds
- **JWT**: Access token (15 phút) + Refresh token (7 ngày)
- **Rate limiting**: 5 requests/15 phút cho auth endpoints
- **CORS**: Chỉ cho phép frontend URL đã cấu hình
- **Helmet**: Security headers
- **Input validation**: Zod schemas
- **Không trả password hash** trong mọi response
- **Giới hạn đăng nhập**: Khóa tạm thời sau 5 lần sai

## Mở rộng

- **Quên mật khẩu**: Thêm endpoint gửi email reset password
- **Xác thực 2 yếu tố (2FA)**: Tích hợp TOTP/SMS
- **Social login**: Google, Facebook OAuth
- **Email verification**: Gửi link xác thực email
- **Admin dashboard**: Quản lý người dùng

## API Documentation

File OpenAPI 3.0 có tại `backend/openapi.yaml`. Xem trực tuyến bằng:
- Swagger Editor: https://editor.swagger.io/
- Swagger UI: `npx swagger-ui-watcher backend/openapi.yaml`
