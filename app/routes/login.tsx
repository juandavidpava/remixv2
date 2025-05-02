import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { login } from "~/utils/auth.server";
import { createUserSession } from "~/utils/session.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const user = await login({ email, password });
  if (!user) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  return createUserSession(user.id, "/");
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1>Enter your credentials</h1>
      <Form method="post">
        <div><input type="email" name="email" placeholder="Email" /></div>      
        <div><input type="password" name="password" placeholder="Password" /></div>
        <div><button type="submit">Log In</button></div>
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      </Form>
    </div>
  );
}
