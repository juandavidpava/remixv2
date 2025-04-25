# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.


# Progreso de Aprendizaje con Remix

Este documento resume el progreso de aprendizaje utilizando el framework Remix, siguiendo una metodología práctica basada en retos técnicos y construcción progresiva de funcionalidades.

---

## 🧠 Metodología

Trabajamos con una metodología enfocada en la **práctica guiada + retos técnicos**. Cada bloque temático se refuerza mediante ejemplos reales dentro de un proyecto unificado, con retos diseñados para consolidar lo aprendido.

---

## ✅ Temas Vistos

- **Loaders**: Carga de datos desde el servidor antes de renderizar.
- **Actions**: Manejo de envíos de formularios (POST, PUT, DELETE).
- **Rutas Dinámicas**: Uso de parámetros en la ruta (ej. `/users/:userId`).
- **Rutas Anidadas**: Composición de componentes con `<Outlet />`.
- **Manejo de Errores**: Uso de `ErrorBoundary` y `CatchBoundary`.
- **Formularios Remix**: Formularios controlados por el servidor usando `<Form method="post">`.
- **Enlaces y Navegación**: Navegación fluida con `<Link>`.
- **API Interna**: Separación de la lógica de datos en `/api`.
- **Nested Components**: Estructura y renderizado dentro de rutas hijas.
- **Hooks Remix**: `useLoaderData`, `useParams`, `useRouteError`, etc.
- **Manejo de Estado con Datos**: UI que reacciona a acciones sin necesidad de hooks de estado locales.
- **Patrones CRUD**: Creación completa de interfaces con Create, Read, Update y Delete.

---

## 🏗️ Retos Realizados

- **Reto Users**: 
  - Implementación de lista de usuarios.
  - Formulario para crear y actualizar.
  - Detalle de usuario con borrado.
  
- **Reto User Notes**:
  - Notas dinámicas por usuario.
  - Rutas anidadas.
  - CRUD completo de notas.

---

## 🕳️ Temas Faltantes

- **Autenticación**: Manejo de sesiones, login y protección de rutas.
- **Validación de Datos**: Validaciones en el servidor con zod o lógica personalizada.
- **Manejo de Archivos**: Subida de archivos y procesamiento de archivos adjuntos.
- **Estilos y Componentes UI**: Uso de TailwindCSS o UI Libraries.
- **Tests**: Pruebas de lógica, rutas y actions.
- **Deploy**: Despliegue a Vercel, Fly.io o Railway.
- **Consumo de API Externa**: Integración con APIs de terceros desde Remix.
- **FormData Avanzado**: Manejo de formularios con múltiples campos, archivos o submits programáticos.

---

## 📊 Estado Actual

- **Cobertura Aproximada**: 70%
- **Comentario**: 
  Has construido una base sólida. Con lo aprendido puedes crear aplicaciones funcionales completas.
  Los temas pendientes te llevarán al siguiente nivel, incluyendo autenticación, validación, despliegue y UI profesional.

---

> Próximo paso sugerido: implementar autenticación con cookies o JWT para comenzar con el sistema de login y sesiones protegidas.

