import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createNote } from "./api/note.js";

type Note = {
    title: string,
    content: string
}

export const action: ActionFunction = async ({request, params}) => {
  const { userId } = params
  const formData = await request.formData();
  const note: Note = {
      title: formData.get('title')?.toString() || '',
      content: formData.get('content')?.toString() || ''
  }

  if(!formData.get('title') || !formData.get('content'))
    return null;

  await createNote(userId || '' , note)
  return redirect(`/users/${userId}/notes`)
}

export default function newNotesUser() {
    return <div className="text-2xl font-bold mt-4 bg-gray-100 bg-opacity-70 p-2 rounded">
        <Form method="post" className="space-y-2">
        <div>
          <label>Title:</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content"/>
        </div>
        <input type="hidden" name="_method" value="post" />
        <button type="submit">Create</button>
      </Form>
    </div>
}