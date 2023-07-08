interface Note {
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: String[];
  linkedNotes: any[];
  noteContentText: string;
}

export default Note;
