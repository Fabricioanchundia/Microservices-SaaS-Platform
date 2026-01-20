---

# 🚀 SaaS Orders Platform — Secure Microservices Backend

A **production-ready backend** built with a **microservices architecture**, featuring **JWT authentication, role-based access control, an API Gateway, and secure internal communication**, designed for real-world **SaaS, e-commerce, and enterprise platforms**.

This project demonstrates **architectural thinking**, **security-first design**, **clear separation of concerns**, and **backend best practices** using **NestJS + PostgreSQL**.

---

## 🧠 System Architecture

```
┌──────────────┐
│  API Gateway │  ← JWT validation / Role checks
└──────┬───────┘
       │ Secure internal communication
       │ (x-internal-key)
┌──────▼────────┐      ┌──────────────────┐
│ Auth Service  │      │ Orders Service   │
│ JWT / Roles   │      │ Orders logic     │
└───────────────┘      └──────────────────┘
```

### Services Overview

* **API Gateway** → Single entry point for all requests
* **Auth Service** → Authentication, JWT issuance, role management (`admin`, `user`)
* **Orders Service** → Core business logic for order management

---

## 🔐 Implemented Security

* Signed JWT tokens (HS256)

* Roles embedded directly in JWT payload

* Custom guards:

  * `JwtAuthGuard`
  * `InternalGuard`

* Secure internal microservice communication via:

  ```
  x-internal-key
  ```

* Clear separation between:

  * Public access
  * Authenticated access
  * Administrative access

---

## 👥 System Roles

| Role  | Permissions                          |
| ----- | ------------------------------------ |
| user  | Create orders, view own orders       |
| admin | View all orders, update order status |

Roles are validated **both at the API Gateway and inside the microservice**, preventing security bypasses.

---

## 📦 Core Features

### User Capabilities

* Login with JWT
* Create orders
* List personal orders
* View order details

### Admin Capabilities

* List all orders
* Update order status (`CREATED → PAID`)
* Access protected by role + internal security key

---

## 🔁 Order Status Update Flow (ADMIN)

1. Admin authenticates and receives a JWT

2. API Gateway validates JWT and role

3. Gateway forwards the request with internal headers:

   ```
   x-user-id
   x-user-role
   x-internal-key
   ```

4. Orders Service validates:

   * Internal API key
   * `admin` role

5. Order status update is executed

✔ **Double-layer security enforcement**

---

## 🛠️ Technology Stack

* **Node.js**
* **NestJS**
* **TypeORM**
* **PostgreSQL**
* **JWT**
* **bcrypt**
* **REST APIs**
* **Microservices Architecture**

---

## ⚙️ Environment Variables

Example `.env` file:

```env
DATABASE_URL=postgres://user:password@localhost:5432/orders_db
JWT_SECRET=super_secret_key
INTERNAL_API_KEY=internal_secure_key
```

---

## ▶️ Running the Project

```bash
# Install dependencies
npm install

# Run each microservice
npm run start:dev
```

> Each microservice runs independently.

---

## 🧪 Key Endpoints

### Auth Service

```
POST /auth/login
```

### Orders (User)

```
POST /orders
GET  /orders
GET  /orders/:id
```

### Orders (Admin)

```
GET   /orders/admin/all
PATCH /orders/:id/status
```

---

## 📈 Professional Focus

This project is designed to demonstrate:

* Strong architectural decision-making
* Real security implementation (not simulated)
* Role-based access control
* Scalability and maintainability
* Clean, extensible backend code

It provides a solid foundation for:

* SaaS platforms
* E-commerce systems
* Enterprise backends
* Multi-user applications

---

## 👨‍💻 Author

**Fabricio Anchundia**
Backend Developer

**NestJS · PostgreSQL · Microservices · JWT**

📩 *Open to remote backend opportunities and professional projects*
---

