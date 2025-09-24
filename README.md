# Cuebana Back - API REST

API REST completa con autenticación JWT y operaciones CRUD para gestión de contenido cinematográfico.

## Características

- ✅ Autenticación JWT con bcrypt
- ✅ CRUD completo para todos los modelos
- ✅ Middleware de autenticación
- ✅ Arquitectura SAF (Service-Actions-Frontend)
- ✅ Validaciones y manejo de errores
- ✅ Conexión a MongoDB

## Modelos

- **Users**: Gestión de usuarios
- **Directors**: Directores de películas
- **Generos**: Géneros cinematográficos
- **Posts**: Publicaciones de contenido
- **Productoras**: Compañías productoras
- **Tipos**: Tipos de contenido

## Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor
pnpm start
```

## Variables de Entorno

```env
MONGO_URI=mongodb://localhost:27017/cuebana
TOKEN_SECRET=tu_clave_secreta_jwt
NODE_ENV=development
PORT=8080
```

## Endpoints

### Autenticación

#### POST /api/auth/register
Registrar nuevo usuario
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

#### POST /api/auth/login
Iniciar sesión
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

### Directores

#### GET /api/directores
Obtener todos los directores
- Query params: `?estado=true/false`

#### GET /api/directores/:id
Obtener director por ID

#### GET /api/directores/search/:name
Buscar director por nombre

#### POST /api/directores
Crear nuevo director
```json
{
  "name": "Nombre del Director",
  "estado": true
}
```

#### PUT /api/directores/:id
Actualizar director

#### DELETE /api/directores/:id
Eliminar director

### Géneros

#### GET /api/generos
Obtener todos los géneros
- Query params: `?estado=true/false`

#### GET /api/generos/:id
Obtener género por ID

#### GET /api/generos/search/:name
Buscar género por nombre

#### POST /api/generos
Crear nuevo género
```json
{
  "name": "acción",
  "estado": true,
  "descripcion": "Películas de acción y aventura"
}
```

#### PUT /api/generos/:id
Actualizar género

#### DELETE /api/generos/:id
Eliminar género

### Posts

#### GET /api/posts
Obtener todos los posts

#### GET /api/posts/:id
Obtener post por ID

#### GET /api/posts/genero/:generoId
Obtener posts por género

#### GET /api/posts/search/:title
Buscar posts por título

#### POST /api/posts
Crear nuevo post
```json
{
  "title": "Título del Post",
  "description": "Descripción del contenido",
  "generoId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

#### PUT /api/posts/:id
Actualizar post

#### DELETE /api/posts/:id
Eliminar post

### Productoras

#### GET /api/productoras
Obtener todas las productoras
- Query params: `?estado=true/false`

#### GET /api/productoras/:id
Obtener productora por ID

#### GET /api/productoras/search/:name
Buscar productora por nombre

#### GET /api/productoras/slogan/:slogan
Buscar productora por slogan

#### POST /api/productoras
Crear nueva productora
```json
{
  "name": "Warner Bros",
  "estado": true,
  "slogan": "Entertainment for All",
  "description": "Compañía de entretenimiento global"
}
```

#### PUT /api/productoras/:id
Actualizar productora

#### DELETE /api/productoras/:id
Eliminar productora

### Tipos

#### GET /api/tipos
Obtener todos los tipos

#### GET /api/tipos/:id
Obtener tipo por ID

#### GET /api/tipos/search/:name
Buscar tipo por nombre

#### GET /api/tipos/descripcion/:descripcion
Buscar tipos por descripción

#### POST /api/tipos
Crear nuevo tipo
```json
{
  "name": "Película",
  "descripcion": "Contenido cinematográfico de larga duración"
}
```

#### PUT /api/tipos/:id
Actualizar tipo

#### DELETE /api/tipos/:id
Eliminar tipo

### Usuarios

#### GET /api/users
Obtener todos los usuarios (requiere autenticación)

#### GET /api/users/profile
Obtener perfil del usuario autenticado

#### GET /api/users/:id
Obtener usuario por ID

#### GET /api/users/email/:email
Buscar usuario por email

#### PUT /api/users/profile
Actualizar perfil del usuario autenticado
```json
{
  "email": "nuevo@email.com",
  "password": "nuevaContraseña"
}
```

#### PUT /api/users/:id/verify
Verificar usuario

### Salud de la API

#### GET /api/health
Verificar estado de la API

## Autenticación

Todas las rutas (excepto `/api/auth/*` y `/api/health`) requieren autenticación JWT.

Incluir el token en el header:
```
Authorization: Bearer tu_jwt_token_aqui
```

## Respuestas

### Éxito
```json
{
  "success": true,
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## Estructura del Proyecto

```
├── Service/           # Lógica de negocio
├── routes/           # Rutas de la API
├── models/           # Modelos de MongoDB
├── utils/            # Utilidades (auth, etc.)
├── index.js          # Punto de entrada
└── package.json      # Dependencias
```

## Dependencias

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **jsonwebtoken**: Manejo de JWT
- **bcrypt**: Hash de contraseñas
- **cors**: Configuración CORS
- **dotenv**: Variables de entorno

## Desarrollo

El servidor se reinicia automáticamente con cambios en el código durante el desarrollo.

```bash
pnpm start
```

## Arquitectura SAF

- **Service**: Lógica de negocio y acceso a datos
- **Actions**: Orquestación (en este caso, las rutas)
- **Frontend**: Interfaz de usuario (separada)

Cada servicio extiende de `BaseService` que proporciona operaciones CRUD estándar.