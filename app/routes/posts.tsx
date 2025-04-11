import { Outlet, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  return res.json();
};

export default function Posts() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Posts</h1>
      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={`${post.id}`} className="text-blue-600 hover:underline">
              - {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold mt-4 bg-gray-100 bg-opacity-70 p-2 rounded">
        <h2>Details Post</h2>
        {/* Aquí se renderiza el detalle del post */}
        <Outlet />
      </div>
    </div>
  );
}
