interface Note {
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: String[];
  linkedNotes: any[];
  noteContentText: string;
  isGlobal: boolean;
  user: string;
  likes: number;
}

export default Note;
