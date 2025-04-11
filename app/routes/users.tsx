import { LoaderFunction } from "@remix-run/node";
import { getUsers } from "./api/user";
import {
  useLoaderData,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";


// ✅ Loader que obtiene los usuarios
export const loader: LoaderFunction = async () => {
  const users = await getUsers(); // Si esto falla, se captura abajo
  return users;
};

// ✅ Componente principal
export default function UsersPage() {
  const users = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>- {user.name}</Link>
          </li>
        ))}
      </ul>
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
