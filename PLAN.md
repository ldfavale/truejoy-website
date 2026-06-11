# Plan de Acción: E-commerce Incremental (Truejoy)

Este plan detalla el desarrollo paso a paso del e-commerce para Truejoy utilizando **Next.js, Supabase, Tailwind CSS, Paddle y Vercel**. Está diseñado de forma incremental, priorizando entregables funcionales cortos y el aprendizaje progresivo de conceptos clave.


## 🚀 Fases del Proyecto

### [x] Fase 1: Catálogo Completo e Independiente y Páginas de Producto
* **Entregable**: Landing page restaurada con botón de enlace al catálogo completo en `/productos`. Esta nueva página cuenta con buscador y filtros dinámicos (categoría y edad) cargando datos de Supabase, y rutas dinámicas `/productos/[id]` para ver detalles.
* **Conceptos clave a aprender**:
  * **Next.js**: Server Components (data fetching seguro en el servidor) vs Client Components (interactividad de búsqueda/filtros con `"use client"`), y Dynamic Routing (rutas dinámicas basadas en `[id]`).
  * **Supabase**: PostgreSQL básico, creación de la tabla `products`, RLS público y consultas utilizando el cliente de Supabase JS.
  * **Tailwind CSS**: Layouts con CSS Grid y Flexbox responsivo con Tailwind CSS v4 para listados y filtros de productos.

---

### [x] Fase 2: Carrito de Compras Local
* **Entregable**: Botón "Añadir al carrito", panel lateral interactivo (drawer) para modificar cantidades, persistencia en el navegador.
* **Conceptos clave a aprender**:
  * **Next.js / React**: Client Components (uso de `"use client"` para interactividad), Context API (estado global para el carrito), y control de la deshidratación/hidratación (evitar errores cuando el HTML de servidor no coincide con el del cliente).
  * **Tailwind CSS**: Transiciones nativas y estados interactivos (`hover`, `focus`, animaciones de entrada/salida).

---

### [ ] Fase 3: Autenticación de Usuarios
* **Entregable**: Login y Registro de usuarios para poder realizar compras, barra de navegación adaptativa, página de perfil del usuario.
* **Conceptos clave a aprender**:
  * **Supabase Auth**: Autenticación por email/contraseña, manejo de sesiones (JWT) y cookies automáticas.
  * **Next.js**: Middleware (interceptar rutas para protegerlas, ej: `/perfil` solo para logueados), y Server Actions (funciones del servidor ejecutadas desde formularios cliente).

---

### [ ] Fase 4: Integración de Pagos con Paddle
* **Entregable**: Checkout funcional en modo pruebas (sandbox) que procesa pagos y guarda la orden en la base de datos de Supabase.
* **Conceptos clave a aprender**:
  * **Paddle**: Paddle.js para levantar el checkout superpuesto, y configuración de Webhooks (notificaciones de eventos de pago).
  * **Next.js**: Route Handlers (endpoints de API `/api/webhooks/paddle` para recibir el webhook y verificar firmas).
  * **Supabase**: Relaciones en base de datos (tablas `orders` y `order_items`) y Row Level Security (RLS) para que un usuario solo pueda leer sus propias órdenes.

---

### [ ] Fase 5: Despliegue en Vercel y SEO
* **Entregable**: E-commerce en producción en Vercel, optimizado para buscadores.
* **Conceptos clave a aprender**:
  * **Vercel**: Configuración de variables de entorno de producción, monitoreo de logs de servidor.
  * **Next.js SEO**: Metadata API (títulos, descripciones y Open Graph dinámicos por producto).
