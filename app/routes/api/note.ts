type Note = {
    id: string,
    title: string,
    content: string
}

let notesDB: Record<string, Note[]> = {};

export async function getNotes(userId: string) {
  return notesDB[userId] || [];
}

export async function createNote(userId: string, note: { title: string; content: string }) {
  const id = Math.random().toString(36).substring(2, 9);
  const newNote = { id, ...note };
  notesDB[userId] = [...(notesDB[userId] || []), newNote];
  return newNote;
}

export async function deleteNote(userId: string, noteId: string) {
  notesDB[userId] = (notesDB[userId] || []).filter(note => note.id !== noteId);
}

export async function updateNote(userId: string, noteId: string, updatedNote: { title: string; content: string }) {
  const notes = notesDB[userId] || [];
  const noteIndex = notes.findIndex(note => note.id === noteId);
  
  if (noteIndex !== -1) {
    notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
    notesDB[userId] = notes;
  }
}
