// app/routes/protected.tsx

import { LoaderFunction, json, redirect } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  // Si no hay usuario en la sesión, redirigimos al login
  if (!userId) {
    return redirect("/login");
  }

  // Si el usuario está logueado, devolvemos su ID (o lo que quieras mostrar)
  return json({ userId });
};

export default function Protected() {
  return (
    <div>
      <h1>This is a protected page!</h1>
      <p>Only accessible if you are logged in.</p>
    </div>
  );
}
