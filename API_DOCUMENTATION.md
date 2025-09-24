# Documentación API - Cuebana Back

## Base URL
```
http://localhost:3000/api
```
<!-- 
la mayoría de las rutas requieren autenticación JWT. 
pero yo le quite el auth porque no era necesario. -->

## Autenticación

Todas las rutas (excepto `/auth/*` y `/health`) requieren autenticación JWT.

**Header requerido:**
```
Authorization: Bearer <tu_jwt_token>
```

---

## 🔐 Autenticación

### Registrar Usuario
**POST** `/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "email": "usuario@ejemplo.com",
      "verified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Iniciar Sesión
**POST** `/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "email": "usuario@ejemplo.com",
      "verified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🎬 Directores

### Obtener todos los directores
**GET** `/directores`

```bash
curl -X GET http://localhost:3000/api/directores \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener directores por estado
**GET** `/directores?estado=true`

```bash
curl -X GET "http://localhost:3000/api/directores?estado=true" \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener director por ID
**GET** `/directores/:id`

```bash
curl -X GET http://localhost:3000/api/directores/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar director por nombre
**GET** `/directores/search/:name`

```bash
curl -X GET http://localhost:3000/api/directores/search/Spielberg \
  -H "Authorization: Bearer <tu_token>"
```

### Crear director
**POST** `/directores`

```bash
curl -X POST http://localhost:3000/api/directores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Steven Spielberg",
    "estado": true
  }'
```

### Actualizar director
**PUT** `/directores/:id`

```bash
curl -X PUT http://localhost:3000/api/directores/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Steven Allan Spielberg",
    "estado": true
  }'
```

### Eliminar director
**DELETE** `/directores/:id`

```bash
curl -X DELETE http://localhost:3000/api/directores/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

---

## 🎭 Géneros

### Obtener todos los géneros
**GET** `/generos`

```bash
curl -X GET http://localhost:3000/api/generos \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener géneros por estado
**GET** `/generos?estado=true`

```bash
curl -X GET "http://localhost:3000/api/generos?estado=true" \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener género por ID
**GET** `/generos/:id`

```bash
curl -X GET http://localhost:3000/api/generos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar género por nombre
**GET** `/generos/search/:name`

```bash
curl -X GET http://localhost:3000/api/generos/search/accion \
  -H "Authorization: Bearer <tu_token>"
```

### Crear género
**POST** `/generos`

```bash
curl -X POST http://localhost:3000/api/generos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "acción",
    "estado": true,
    "descripcion": "Películas de acción y aventura con mucha adrenalina"
  }'
```

### Actualizar género
**PUT** `/generos/:id`

```bash
curl -X PUT http://localhost:3000/api/generos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "acción y aventura",
    "estado": true,
    "descripcion": "Películas llenas de acción, aventura y emoción"
  }'
```

### Eliminar género
**DELETE** `/generos/:id`

```bash
curl -X DELETE http://localhost:3000/api/generos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

---

## 📝 Posts

### Obtener todos los posts
**GET** `/posts`

```bash
curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener post por ID
**GET** `/posts/:id`

```bash
curl -X GET http://localhost:3000/api/posts/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener posts por género
**GET** `/posts/genero/:generoId`

```bash
curl -X GET http://localhost:3000/api/posts/genero/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar posts por título
**GET** `/posts/search/:title`

```bash
curl -X GET http://localhost:3000/api/posts/search/Avengers \
  -H "Authorization: Bearer <tu_token>"
```

### Crear post
**POST** `/posts`

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "title": "Avengers: Endgame",
    "description": "La batalla final contra Thanos. Los Avengers deben reunirse una vez más para deshacer las acciones de Thanos y restaurar el orden en el universo.",
    "generoId": "64f8a1b2c3d4e5f6a7b8c9d0"
  }'
```

### Actualizar post
**PUT** `/posts/:id`

```bash
curl -X PUT http://localhost:3000/api/posts/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "title": "Avengers: Endgame - Director Cut",
    "description": "La versión extendida de la batalla final contra Thanos con escenas adicionales.",
    "generoId": "64f8a1b2c3d4e5f6a7b8c9d0"
  }'
```

### Eliminar post
**DELETE** `/posts/:id`

```bash
curl -X DELETE http://localhost:3000/api/posts/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

---

## 🏢 Productoras

### Obtener todas las productoras
**GET** `/productoras`

```bash
curl -X GET http://localhost:3000/api/productoras \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener productoras por estado
**GET** `/productoras?estado=true`

```bash
curl -X GET "http://localhost:3000/api/productoras?estado=true" \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener productora por ID
**GET** `/productoras/:id`

```bash
curl -X GET http://localhost:3000/api/productoras/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar productora por nombre
**GET** `/productoras/search/:name`

```bash
curl -X GET http://localhost:3000/api/productoras/search/Marvel \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar productora por slogan
**GET** `/productoras/slogan/:slogan`

```bash
curl -X GET http://localhost:3000/api/productoras/slogan/Entertainment \
  -H "Authorization: Bearer <tu_token>"
```

### Crear productora
**POST** `/productoras`

```bash
curl -X POST http://localhost:3000/api/productoras \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Marvel Studios",
    "estado": true,
    "slogan": "Heroes Assemble",
    "description": "Estudio cinematográfico especializado en películas de superhéroes del universo Marvel"
  }'
```

### Actualizar productora
**PUT** `/productoras/:id`

```bash
curl -X PUT http://localhost:3000/api/productoras/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Marvel Studios LLC",
    "estado": true,
    "slogan": "Heroes Always Assemble",
    "description": "El principal estudio de películas de superhéroes del mundo"
  }'
```

### Eliminar productora
**DELETE** `/productoras/:id`

```bash
curl -X DELETE http://localhost:3000/api/productoras/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

---

## 🏷️ Tipos

### Obtener todos los tipos
**GET** `/tipos`

```bash
curl -X GET http://localhost:3000/api/tipos \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener tipo por ID
**GET** `/tipos/:id`

```bash
curl -X GET http://localhost:3000/api/tipos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar tipo por nombre
**GET** `/tipos/search/:name`

```bash
curl -X GET http://localhost:3000/api/tipos/search/Película \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar tipos por descripción
**GET** `/tipos/descripcion/:descripcion`

```bash
curl -X GET http://localhost:3000/api/tipos/descripcion/larga \
  -H "Authorization: Bearer <tu_token>"
```

### Crear tipo
**POST** `/tipos`

```bash
curl -X POST http://localhost:3000/api/tipos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Película",
    "descripcion": "Contenido cinematográfico de larga duración, típicamente entre 90-180 minutos"
  }'
```

### Actualizar tipo
**PUT** `/tipos/:id`

```bash
curl -X PUT http://localhost:3000/api/tipos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "name": "Largometraje",
    "descripcion": "Película de larga duración con narrativa completa"
  }'
```

### Eliminar tipo
**DELETE** `/tipos/:id`

```bash
curl -X DELETE http://localhost:3000/api/tipos/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

---

## 👥 Usuarios

### Obtener todos los usuarios
**GET** `/users`

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener perfil del usuario autenticado
**GET** `/users/profile`

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <tu_token>"
```

### Obtener usuario por ID
**GET** `/users/:id`

```bash
curl -X GET http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <tu_token>"
```

### Buscar usuario por email
**GET** `/users/email/:email`

```bash
curl -X GET http://localhost:3000/api/users/email/usuario@ejemplo.com \
  -H "Authorization: Bearer <tu_token>"
```

### Actualizar perfil del usuario autenticado
**PUT** `/users/profile`

```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "email": "nuevo@email.com",
    "password": "nuevaContraseña123"
  }'
```

### Verificar usuario
**PUT** `/users/:id/verify`

```bash
curl -X PUT http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0/verify \
  -H "Authorization: Bearer <tu_token>"
```

---

## 🏥 Salud de la API

### Verificar estado de la API
**GET** `/health`

```bash
curl -X GET http://localhost:3000/api/health
```

**Respuesta:**
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📋 Respuestas Estándar

### Respuesta Exitosa
```json
{
  "success": true,
  "data": {
    // Datos del recurso
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🔧 Códigos de Estado HTTP

- **200** - OK (Operación exitosa)
- **201** - Created (Recurso creado exitosamente)
- **400** - Bad Request (Datos inválidos)
- **401** - Unauthorized (Token inválido o faltante)
- **404** - Not Found (Recurso no encontrado)
- **500** - Internal Server Error (Error del servidor)

---

## 📝 Notas Importantes

1. **Autenticación**: Todas las rutas requieren JWT excepto `/auth/*` y `/health`
2. **Formato de fechas**: ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
3. **Encoding**: UTF-8
4. **Content-Type**: application/json para todas las peticiones POST/PUT
5. **Paginación**: No implementada en esta versión
6. **Rate Limiting**: No implementado en esta versión

---

## 🚀 Ejemplo de Flujo Completo

```bash
# 1. Registrar usuario
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"test123"}' | \
  jq -r '.data.token')

# 2. Crear un género
GENERO_ID=$(curl -s -X POST http://localhost:3000/api/generos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"acción","estado":true,"descripcion":"Películas de acción"}' | \
  jq -r '.data._id')

# 3. Crear un post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"title\":\"Mi Película\",\"description\":\"Una gran película\",\"generoId\":\"$GENERO_ID\"}"

# 4. Obtener todos los posts
curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer $TOKEN"