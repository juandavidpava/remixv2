// src/utils/auth.server.ts

type LoginArgs = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginArgs) {
  // Simulación: reemplazaremos esto con la consulta real a la base de datos
  if (email === "test@example.com" && password === "password123") {
    return { id: "user-1", email };
  }

  return null;
}