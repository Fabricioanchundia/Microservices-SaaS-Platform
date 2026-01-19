
---

# 🚀 SaaS Orders Platform — Secure Microservices Backend

Backend profesional basado en **arquitectura de microservicios**, con **JWT, roles, API Gateway y control de acceso interno**, diseñado para escenarios reales de **SaaS, e-commerce y plataformas empresariales**.

Este proyecto demuestra **criterio arquitectónico**, **seguridad**, **separación de responsabilidades** y **buenas prácticas backend** usando **NestJS + PostgreSQL**.

---

## 🧠 Arquitectura General

```
┌──────────────┐
│  API Gateway │  ← Validación JWT / Roles
└──────┬───────┘
       │ Comunicación interna segura
       │ (x-internal-key)
┌──────▼────────┐      ┌──────────────────┐
│ Auth Service  │      │ Orders Service   │
│ JWT / Roles   │      │ Gestión pedidos  │
└───────────────┘      └──────────────────┘
```

### Servicios

* **API Gateway** → Punto único de entrada
* **Auth Service** → Login, JWT, roles (`admin`, `user`)
* **Orders Service** → Lógica de negocio de pedidos

---

## 🔐 Seguridad Implementada

* JWT firmado (HS256)
* Roles embebidos en el token
* Guards personalizados:

  * `JwtAuthGuard`
  * `InternalGuard`
* Comunicación entre microservicios protegida con:

  ```
  x-internal-key
  ```
* Separación clara entre:

  * Acceso público
  * Acceso autenticado
  * Acceso administrativo

---

## 👥 Roles del Sistema

| Rol   | Permisos                              |
| ----- | ------------------------------------- |
| user  | Crear pedidos, ver sus pedidos        |
| admin | Ver todos los pedidos, cambiar estado |

Los roles se validan **tanto en el Gateway como en el microservicio**, evitando bypass de seguridad.

---

## 📦 Funcionalidades Principales

### Usuario

* Login con JWT
* Crear pedidos
* Listar sus pedidos
* Ver detalle de pedido

### Administrador

* Listar todos los pedidos
* Cambiar estado de pedido (`CREATED → PAID`)
* Acceso protegido por rol + clave interna

---

## 🔁 Flujo de Actualización de Estado (ADMIN)

1. Admin se autentica → obtiene JWT
2. Gateway valida JWT y rol
3. Gateway reenvía request con headers internos:

   ```
   x-user-id
   x-user-role
   x-internal-key
   ```
4. Orders Service valida:

   * Clave interna
   * Rol `admin`
5. Se ejecuta el cambio de estado

✔ Seguridad de doble capa

---

## 🛠️ Tecnologías Utilizadas

* **Node.js**
* **NestJS**
* **TypeORM**
* **PostgreSQL**
* **JWT**
* **bcrypt**
* **REST APIs**
* **Arquitectura por microservicios**

---

## ⚙️ Variables de Entorno

Ejemplo `.env`:

```env
DATABASE_URL=postgres://user:password@localhost:5432/orders_db
JWT_SECRET=super_secret_key
INTERNAL_API_KEY=internal_secure_key
```

---

## ▶️ Cómo Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar cada servicio
npm run start:dev
```

> Cada microservicio corre de forma independiente.

---

## 🧪 Endpoints Clave

### Auth

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

## 📈 Enfoque Profesional

Este proyecto está diseñado para demostrar:

* Pensamiento arquitectónico
* Seguridad real (no simulada)
* Control de acceso por roles
* Escalabilidad
* Código mantenible y extensible

Es una base sólida para:

* SaaS
* E-commerce
* Sistemas empresariales
* Plataformas multi-usuario

---

## 👨‍💻 Autor

**Fabricio Anchundia**
Backend Developer
NestJS · PostgreSQL · Microservices · JWT

📩 *Disponible para oportunidades remotas y proyectos backend*

---