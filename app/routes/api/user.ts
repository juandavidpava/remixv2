const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUser(id: string) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}