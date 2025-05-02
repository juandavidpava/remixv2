// src/utils/session.server.ts
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const now = new Date();
const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999); // 23:59:59.999 del mismo día

const secondsUntilEndOfDay = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: secondsUntilEndOfDay,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserId(request: Request): Promise<string | null> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  return userId || null;
}

