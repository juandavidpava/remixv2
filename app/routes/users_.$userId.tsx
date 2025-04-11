import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "./api/user";

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUser(params.userId!);
  return json(user);
};

// 2. Componente
export default function UserDetail() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Perfil de {user.name}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Teléfono:</strong> {user.phone}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Ciudad:</strong> {user.address.city}
      </p>
      <h3 ><a href="/">🏠 Back home</a></h3>
    </div>
  );
}
