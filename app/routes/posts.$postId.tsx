import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);

  if (!res.ok) {
    throw new Response("Post no encontrado", { status: 404 });
  }
  return res.json();
};

export default function PostDetail() {
  const post = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.body}</p>
    </div>
  );
}
