# NestJS Google OAuth

API de registro e inicio de sesion con Google OAuth2, JWT y PostgreSQL.

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- Una aplicacion configurada en Google Cloud Console

## Configuracion

1. Copiar `.env.example` como `.env`.
2. Completar las variables de base de datos, Google y JWT.
3. Crear una base de datos llamada `nestjs_google_oauth` o usar el nombre indicado en `DB_DATABASE`.
4. En Google Cloud Console agregar estas URLs:
   - Origen autorizado: `http://localhost:3000`
   - URI de redireccion: `http://localhost:3000/auth/google/redirect`

## Ejecutar

```bash
npm install
npm run start:dev
```

## Endpoints

- `GET /auth/google`: inicia el login con Google.
- `GET /auth/google/redirect`: recibe la respuesta de Google, crea o vincula el usuario y redirige al frontend con el JWT.

## Estructura

- `src/auth`: estrategia de Google, JWT y endpoints.
- `src/users`: entidad y acceso a usuarios.
- `src/database`: conexion a PostgreSQL.
