import { LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getUser, updateUser, deleteUser } from "./api/user";

// Loader para cargar el usuario
export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUser(params.userId!);
  return user;
};

// Action para manejar delete y update
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const method = formData.get("_method");

  if (method === "delete") {
    await deleteUser(params.userId!);
    return redirect("/users");
  }

  if (method === "put") {
    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };
    await updateUser(params.userId!, updatedUser);
    return redirect("/users");
  }

  return null;
};

// Componente con detalles, form de edición y botón de eliminar
export default function UserDetailPage() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Perfil de {user.name}</h2>
      <Form method="post" className="space-y-2">
        <div>
          <label>Nombre: </label>
          <input type="text" name="name" defaultValue={user.name} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" defaultValue={user.email} />
        </div>
        <div>
          <label>Teléfono: </label>
          <input type="text" name="phone" defaultValue={user.phone} />
        </div>
        <input type="hidden" name="_method" value="put" />
        <button type="submit">Actualizar</button>
      </Form>

      <Form method="post" className="mt-4">
        <input type="hidden" name="_method" value="delete" />
        <button type="submit" className="text-red-600">Eliminar usuario</button>
      </Form>
      <Link to={`notes`}>
        View Notes 
      </Link>
    </div>
  );
}
