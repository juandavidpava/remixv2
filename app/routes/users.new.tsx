import { Form, redirect } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { createUser } from "./api/user";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
  
    const res = await createUser({ name, email });
    console.log('res', res)
  
    return redirect("/users");
  };


  export default function NewUserPage() {
    return (
      <div>
        <h1>Create New User</h1>
        <Form method="post">
          <p>
            <label>
              Name: <input type="text" name="name" required />
            </label>
          </p>
          <p>
            <label>
              Email: <input type="email" name="email" required />
            </label>
          </p>
          <button type="submit">Create</button>
        </Form>
      </div>
    );
  }