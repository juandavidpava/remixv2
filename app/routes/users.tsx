import { LoaderFunction } from "@remix-run/node";
import { getUsers } from "./api/user";
import {
  useLoaderData,
  Link,
  useRouteError,
  isRouteErrorResponse,
  Outlet,
} from "@remix-run/react";
import { requireUserSession } from "~/utils/session.server";



// ✅ Loader que obtiene los usuarios
export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request); // 🔐 Protege la ruta
  const users = await getUsers();
  return users;
};


// ✅ Componente principal
export default function UsersPage() {
  const users = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to={`/users/new`}>Create User</Link>
      <h1>Users List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>- {user.name}</Link>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold mt-4 bg-gray-100 bg-opacity-70 p-2 rounded">
        <Outlet/>
      </div>
    </div>
  );
}

// 🔴 ErrorBoundary: para errores inesperados como errores en fetch, bugs, etc.
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div style={{ color: "red", padding: "1rem" }}>
      <h2>Something went wrong 💥</h2>
      <pre>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </pre>
    </div>
  );
}

// 🟠 CatchBoundary: para errores lanzados con `throw new Response(...)`
export function CatchBoundary() {
  const caught = useRouteError();

  if (isRouteErrorResponse(caught)) {
    return (
      <div style={{ padding: "1rem", color: "orange" }}>
        <h2>{caught.status} - {caught.statusText}</h2>
        <p>{caught.data || "Oops! Something went wrong."}</p>
      </div>
    );
  }

  return <p>Unknown error occurred.</p>;
}
