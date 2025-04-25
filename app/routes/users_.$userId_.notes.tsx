import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { getNotes, deleteNote, updateNote } from "./api/note";

export const loader:LoaderFunction = async ({params}) => {
    const notes = await getNotes(params.userId || '');
    return notes
}

export const action:ActionFunction = async ({request, params}) => {
    const userId = params.userId
    const formData = await request.formData()
    const noteId = formData.get("noteId") as string;
    const method = formData.get("_method") as string;

    if (method === "delete") {
        await deleteNote(userId || '', noteId || '');
        return null;
    }

    if (method === "put") {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        await updateNote(userId || '', noteId || '', { title, content });
        return null;
    }

    return null;
}

export default function userNotesPage() {
    const notes = useLoaderData<typeof loader>();
    
    return <div>
        <Link to="new">Create Note</Link>
        <Outlet/>
        <h2>Notes user</h2>
            <dl>
                {notes.map((note: any, idx: number) => (
                    <div key={note.id} className="mt-4 border border-white-200 p-4">
                        <Form method="post" className="space-y-4">
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium">Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        defaultValue={note.title}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Content</label>
                                    <textarea 
                                        name="content" 
                                        defaultValue={note.content}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                            <div className="flex ">
                                <input type="hidden" name="noteId" value={note.id} />
                                <input type="hidden" name="_method" value="put" />
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                    Update note
                                </button>
                            </div>
                        </Form>
                        <Form method="post" className="mt-2">
                            <input type="hidden" name="noteId" value={note.id} />
                            <input type="hidden" name="_method" value="delete" />
                            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
                                Delete Note
                            </button>
                        </Form>
                    </div>
                ))}
            </dl>
    </div>
}

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