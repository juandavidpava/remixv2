import { createCookieSessionStorage, redirect, type Session } from "@remix-run/node";

// Nombre de la cookie y configuración básica de seguridad
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET must be set");

export const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    httpOnly: true,
  },
});

/**
 * Obtiene la sesión desde la request (cookie)
 */
export async function getSession(request: Request): Promise<Session> {
  const cookie = request.headers.get("Cookie");
  return storage.getSession(cookie);
}

/**
 * Crea una nueva sesión e inicia sesión con el userId dado
 */
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

/**
 * Destruye la sesión actual (logout)
 */
export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

/**
 * Verifica si el usuario está autenticado, si no redirige
 */
export async function requireUserSession(request: Request) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    throw redirect("/login");
  }

  return userId;
}

/**
 * Devuelve directamente el valor de userId de la sesión (si existe)
 */
export async function getUserId(request: Request): Promise<string | null> {
  const session = await getSession(request);
  const userId = session.get("userId");

  return typeof userId === "string" ? userId : null;
}
